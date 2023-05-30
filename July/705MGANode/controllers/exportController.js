const axios = require('axios')
const xmlparser = require('xml2js').parseString
require('dotenv').config()
const fs = require('fs')

// init slim3
const RAW_SLIM_3 = fs.readFileSync('slim3.json');
const SLIM_3 = JSON.parse(RAW_SLIM_3)
const slim_3_cc = {}
for (let i = 0; i < SLIM_3.length; i++) {
  slim_3_cc[SLIM_3[i]['country-code']] = SLIM_3[i]['alpha-3']
}

const slim_3_a3 = {}
for (let i = 0; i < SLIM_3.length; i++) {
  slim_3_a3[SLIM_3[i]['alpha-3']] = SLIM_3[i]['country-code']
}

// data operations

const getComtradeData = async (req, res, itic, tariff) => {

  const { r, cc, ps } = req.query

  // get comtrade data on export (r -> ROW), import values (ROW <- r) and weights
  console.time('comtradeTimer')

  let returnData = {
    total: {
      importReporters: [],
      exportReporters: [],
      totalReporters: [],
      exportValue: 0,
      unadjustedImportValue: 0,
      adjustedImportValue: 0,
      exportQuantity: 0,
      importQuantity: 0,
      exportWeight: 0,
      importWeight: 0,
      estimatedTaxLoss: 0,
      mirrorGap: 0,
    },
    mirror: {}
  };

  // &token=/mwXuAyUKIl5FgN/SwqjLaYHSvSYUForwKKxzCM61W+/HzrsLNBOW1YDdp7nNjQU23Adm48USgfm5pavUv/iRfhmHtmRjVd3ckZXvNeEE2xDqXJMTBySlX/2nqOv6KH0LP687G0Qc6yhgOTyMWErVA==

  // clean country code
  let country_code = 0
  if (r === '356') {
    // india swap
    country_code = '699'
    // console.log(country_code)
  } else {
    country_code = r
  }

  let exportUrl = `https://comtrade.un.org/api/get?r=${country_code}&px=HS&ps=${ps}&p=ALL&rg=2&cc=${cc}`
  let importUrl = `https://comtrade.un.org/api/get?r=ALL&px=HS&ps=${ps}&p=${country_code}&rg=1&cc=${cc}`

  let token = '&token="/mwXuAyUKIl5FgN/SwqjLaYHSvSYUForwKKxzCM61W+/HzrsLNBOW1YDdp7nNjQU23Adm48USgfm5pavUv/iRfhmHtmRjVd3ckZXvNeEE2xDqXJMTBySlX/2nqOv6KH0LP687G0Qc6yhgOTyMWErVA=="'

  // very irregular behavior
  let exportData = await axios.get(`${exportUrl}${token}`).catch(e => { console.log(new Error(e)) })
  await new Promise(r => setTimeout(r, 200));
  let importData = await axios.get(`${importUrl}${token}`).catch(e => { console.log(new Error(e)) })

  if (!exportData?.data.dataset) {
    res.status(500).send(`Issue pulling export data from UN Comtrade, url: ${exportUrl}`)
  } else if (exportData.data.dataset.length === 0) {
    res.status(500).send(`No export data from UN Comtrade, url: ${exportUrl}`)
  }

  if (!importData?.data.dataset) {
    res.status(500).send(`Issue pulling import data from UN Comtrade, url: ${importUrl}`)
  } else if (importData.data.dataset.length === 0) {
    res.status(500).send(`No import data from UN Comtrade, url: ${exportUrl}`)
  }

  let exportClean = exportData.data.dataset
  let importClean = importData.data.dataset

  // turn into test
  // console.log(`(turn into test) exp: ${exportClean.length}, imp: ${importClean.length}`)

  for (let i = 0; i < exportClean.length; i++) {
    if (exportClean[i]['ptTitle'] !== 'World') {
      returnData.mirror[exportClean[i]['pt3ISO']] = {}
      returnData.mirror[exportClean[i]['pt3ISO']]['export'] = { value: 0, quantity: 0, weight: 0 }

      // record values, quantities and weights into mirror

      returnData.mirror[exportClean[i]['pt3ISO']]['export']['value'] = exportClean[i]['TradeValue']
      returnData.mirror[exportClean[i]['pt3ISO']]['export']['quantity'] = exportClean[i]['TradeQuantity']
      returnData.mirror[exportClean[i]['pt3ISO']]['export']['weight'] = exportClean[i]['NetWeight']


      returnData.total.exportValue += exportClean[i]['TradeValue'];
      returnData.total.exportQuantity += exportClean[i]['TradeQuantity'];
      returnData.total.exportWeight += exportClean[i]['NetWeight'];
    }
  }

  // find average ITIC
  let av_arr = []
  for (const key in itic) {
    let n = parseFloat(itic[key])
    if (n < 1 && n > 0) {
      av_arr.push(n)
    }
  }
  let average = av_arr.reduce((a, b) => a + b, 0) / av_arr.length;

  for (let i = 0; i < importClean.length; i++) {
    if (importClean[i]['rtTitle'] !== 'World') {
      // weird normalization
      let multiplier = !itic[importClean[i]['rt3ISO']] ? average : itic[importClean[i]['rt3ISO']] > 1 ? 1 : itic[importClean[i]['rt3ISO']]
      let value = parseInt(importClean[i]['TradeValue'] * (1 - multiplier))

      if (!returnData.mirror[importClean[i]['rt3ISO']]) {
        returnData.mirror[importClean[i]['rt3ISO']] = { import: {} }
      }
      returnData.mirror[importClean[i]['rt3ISO']]['import'] = { value: 0, quantity: 0, weight: 0 }

      // record values, quantities and weights into mirror

      returnData.mirror[importClean[i]['rt3ISO']]['import']['value'] = importClean[i]['TradeValue']
      returnData.mirror[importClean[i]['rt3ISO']]['import']['quantity'] = importClean[i]['TradeQuantity']
      returnData.mirror[importClean[i]['rt3ISO']]['import']['weight'] = importClean[i]['NetWeight']

      returnData.total.adjustedImportValue += value;
      returnData.total.unadjustedImportValue += importClean[i]['TradeValue']
      returnData.total.importQuantity += importClean[i]['TradeQuantity'];
      returnData.total.importWeight += importClean[i]['NetWeight'];
    }
  }


  for (const country in returnData.mirror) {
    // data org 1
    if (!returnData.mirror[country]['export']) {
      returnData.total.importReporters.push(country)
      returnData.mirror[country]['meta'] = {}
      returnData.mirror[country]['meta']['hasFullData'] = false
      continue
    }

    if (!returnData.mirror[country]['import']) {
      returnData.total.exportReporters.push(country)
      returnData.mirror[country]['meta'] = {}
      returnData.mirror[country]['meta']['hasFullData'] = false
      continue
    }

    returnData.total.totalReporters.push(country)
    returnData.mirror[country]['meta'] = {}
    returnData.mirror[country]['meta']['hasFullData'] = true

    // mirror gap calculation
    returnData.mirror[country]['mirrorGap'] = returnData.mirror[country]['export']['value'] - returnData.mirror[country]['import']['value']
    returnData.total.mirrorGap += returnData.mirror[country]['export']['value'] - returnData.mirror[country]['import']['value']

    // estimated tax loss calculation
    let value = !tariff[slim_3_a3[country]] ? 0 : tariff[slim_3_a3[country]]
    returnData.mirror[country]['tariffRate'] = value
    returnData.mirror[country]['estimatedTaxLoss'] = returnData.mirror[country]['mirrorGap'] * value

    // cumulative estimated tax loss calculation
    returnData.total.estimatedTaxLoss += returnData.mirror[country]['mirrorGap'] * value


    console.log(country, value, returnData.mirror[country]['mirrorGap'], returnData.total.estimatedTaxLoss)

    // weight gap calculation
    returnData.mirror[country]['weightGap'] = returnData.mirror[country]['export']['weight'] - returnData.mirror[country]['import']['weight']

    // value ratio calculation
    returnData.mirror[country]['valueRatio'] = returnData.mirror[country]['import']['value'] / returnData.mirror[country]['export']['value']

    // weight ratio calculation
    returnData.mirror[country]['weightRatio'] = returnData.mirror[country]['import']['weight'] / returnData.mirror[country]['export']['weight']

    // density ratio calculation
    returnData.mirror[country]['densityRatio'] = returnData.mirror[country]['valueRatio'] / returnData.mirror[country]['weightRatio']

  }

  console.timeEnd('comtradeTimer')
  return returnData
}

const getTariffData = async (req, res) => {
  const { _, cc, ps } = req.query

  // get WTO tariff Data
  // url: https://api.wto.org/timeseries/v1/data?i=HS_A_0010&r=356&pc=100630&spc=false&fmt=json&mode=full&lang=1&meta=false&subscription-key=8263c1e2f8094ef691ae731b5383892f

  console.time('tariffTimer')


  let returnData = {}

  let tariffUrl = `https://api.wto.org/timeseries/v1/data?i=HS_A_0010&r=all&pc=${cc}&spc=false&ps=${ps}&fmt=json&mode=full&lang=1&meta=false`

  let tariffData = await axios.get(tariffUrl, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.WTO_SUB_KEY
    }
  }).catch(e => {
    res.status(500).send(`Issue pulling tariff data from WTO API, url: ${tariffUrl}`)
    throw new Error(e)
  })

  const cleanedTariff = tariffData.data.Dataset

  for (let i = 0; i < cleanedTariff.length; i++) {
    returnData[cleanedTariff[i]['ReportingEconomyCode']] = cleanedTariff[i]['Value']
  }

  console.timeEnd('tariffTimer')
  return returnData
}

const getITICData = async (req, res) => {

  const { r, cc, ps } = req.query

  // get ITIC Data
  // url: https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/CIF_FOB_ITIC/AFG+ALB+DZA+AND+AGO+ATG+ARG+ARM+ABW+AUS+AUT+AZE+BHS+BHR+BGD+BRB+BLR+BEL+BLZ+BEN+BMU+BTN+BOL+BIH+BWA+BRA+BRN+BGR+BFA+BDI+CPV+KHM+CMR+CAN+CAF+TCD+CHL+CHN+COL+COM+COG+COD+CRI+CIV+HRV+CUB+CYP+CZE+DNK+DJI+DMA+DOM+ECU+EGY+SLV+ERI+EST+SWZ+ETH+FRO+FJI+FIN+FRA+PYF+GAB+GMB+GEO+DEU+GHA+GRC+GRL+GRD+GTM+GIN+GNB+GUY+HND+HKG+HUN+ISL+IND+IDN+IRN+IRQ+IRL+ISR+ITA+JAM+JPN+JOR+KAZ+KEN+KIR+KOR+KWT+KGZ+LAO+LVA+LBN+LSO+LBY+LTU+LUX+MAC+MDG+MWI+MYS+MDV+MLI+MLT+MRT+MUS+MEX+FSM+MDA+MNG+MNE+MAR+MOZ+MMR+NAM+NPL+NLD+NCL+NZL+NIC+NER+NGA+MKD+NOR+OMN+PAK+PLW+PAN+PNG+PRY+PER+PHL+POL+PRT+QAT+ROU+RUS+RWA+KNA+LCA+VCT+WSM+STP+SAU+SEN+SRB+SYC+SLE+SGP+SVK+SVN+SLB+ZAF+ESP+LKA+SDN+SUR+SWE+CHE+SYR+TWN+TZA+THA+TGO+TON+TTO+TUN+TUR+TKM+TCA+TUV+UGA+UKR+ARE+GBR+USA+URY+UZB+VUT+VEN+VNM+YEM+ZMB+ZWE.IND.1006
  console.time('iticTimer')
  console.time('iticRequestTimer')

  let parsedSeries;
  let returnData = {}

  let allReportingCountries = 'AFG+ALB+DZA+AND+AGO+ATG+ARG+ARM+ABW+AUS+AUT+AZE+BHS+BHR+BGD+BRB+BLR+BEL+BLZ+BEN+BMU+BTN+BOL+BIH+BWA+BRA+BRN+BGR+BFA+BDI+CPV+KHM+CMR+CAN+CAF+TCD+CHL+CHN+COL+COM+COG+COD+CRI+CIV+HRV+CUB+CYP+CZE+DNK+DJI+DMA+DOM+ECU+EGY+SLV+ERI+EST+SWZ+ETH+FRO+FJI+FIN+FRA+PYF+GAB+GMB+GEO+DEU+GHA+GRC+GRL+GRD+GTM+GIN+GNB+GUY+HND+HKG+HUN+ISL+IND+IDN+IRN+IRQ+IRL+ISR+ITA+JAM+JPN+JOR+KAZ+KEN+KIR+KOR+KWT+KGZ+LAO+LVA+LBN+LSO+LBY+LTU+LUX+MAC+MDG+MWI+MYS+MDV+MLI+MLT+MRT+MUS+MEX+FSM+MDA+MNG+MNE+MAR+MOZ+MMR+NAM+NPL+NLD+NCL+NZL+NIC+NER+NGA+MKD+NOR+OMN+PAK+PLW+PAN+PNG+PRY+PER+PHL+POL+PRT+QAT+ROU+RUS+RWA+KNA+LCA+VCT+WSM+STP+SAU+SEN+SRB+SYC+SLE+SGP+SVK+SVN+SLB+ZAF+ESP+LKA+SDN+SUR+SWE+CHE+SYR+TWN+TZA+THA+TGO+TON+TTO+TUN+TUR+TKM+TCA+TUV+UGA+UKR+ARE+GBR+USA+URY+UZB+VUT+VEN+VNM+YEM+ZMB+ZWE'

  // translate country-code to alpha 3
  let partnerCountry = slim_3_cc[r]

  // console.log(partnerCountry, r)

  let commodity = cc.slice(0, -2)

  let iticData = await axios.get(`https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/CIF_FOB_ITIC/${allReportingCountries}.${partnerCountry}.${commodity}`, {
    headers: {
      'Content-Type': 'text/xml'
    }
  }).catch(e => {
    throw new Error(e)
  })

  console.timeEnd('iticRequestTimer')
  console.time('iticParseTimer')

  xmlparser(iticData.data, (e, r) => {
    if (e) {
      throw new Error(e)
    }
    parsedSeries = r['message:MessageGroup']['DataSet'][0]['Series']
  })

  for (let i = 0; i < parsedSeries.length; i++) {
    const point = parsedSeries[i];
    const reporterName = point['SeriesKey'][0]['Value'][0]['$']['value']
    const method = point['SeriesKey'][0]['Value'][3]['$']['value']
    if (method === '1') {
      for (let j = 0; j < point['Obs'].length; j++) {
        const time = point['Obs'][j]['Time'][0]
        const ITIC_VALUE = point['Obs'][j]['ObsValue'][0]['$']['value']
        if (time === ps) {
          if (!returnData[reporterName]) {
            returnData[reporterName] = ITIC_VALUE
          }
        }
      }
    }
  }


  console.timeEnd('iticParseTimer')
  console.timeEnd('iticTimer')

  return returnData
}

module.exports = {
  getComtradeData,
  getITICData,
  getTariffData,
}