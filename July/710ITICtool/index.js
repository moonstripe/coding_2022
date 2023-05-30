const axios = require('axios')
const xmlParser = require('xml2js').parseString
const fs = require('fs')

const pull = async () => {
    let { data } = await axios.get('https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/CIF_FOB_ITIC/AFG+ALB+DZA+AND+AGO+ATG+ARG+ARM+ABW+AUS+AUT+AZE+BHS+BHR+BGD+BRB+BLR+BEL+BLZ+BEN+BMU+BTN+BOL+BIH+BWA+BRA+BRN+BGR+BFA+BDI+CPV+KHM+CMR+CAN+CAF+TCD+CHL+CHN+COL+COM+COG+COD+CRI+CIV+HRV+CUB+CYP+CZE+DNK+DJI+DMA+DOM+ECU+EGY+SLV+ERI+EST+SWZ+ETH+FRO+FJI+FIN+FRA+PYF+GAB+GMB+GEO+DEU+GHA+GRC+GRL+GRD+GTM+GIN+GNB+GUY+HND+HKG+HUN+ISL+IND+IDN+IRN+IRQ+IRL+ISR+ITA+JAM+JPN+JOR+KAZ+KEN+KIR+KOR+KWT+KGZ+LAO+LVA+LBN+LSO+LBY+LTU+LUX+MAC+MDG+MWI+MYS+MDV+MLI+MLT+MRT+MUS+MEX+FSM+MDA+MNG+MNE+MAR+MOZ+MMR+NAM+NPL+NLD+NCL+NZL+NIC+NER+NGA+MKD+NOR+OMN+PAK+PLW+PAN+PNG+PRY+PER+PHL+POL+PRT+QAT+ROU+RUS+RWA+KNA+LCA+VCT+WSM+STP+SAU+SEN+SRB+SYC+SLE+SGP+SVK+SVN+SLB+ZAF+ESP+LKA+SDN+SUR+SWE+CHE+SYR+TWN+TZA+THA+TGO+TON+TTO+TUN+TUR+TKM+TCA+TUV+UGA+UKR+ARE+GBR+USA+URY+UZB+VUT+VEN+VNM+YEM+ZMB+ZWE.IND.1006')

    let parsedObj
    xmlParser(data, (e, r) => {
        if (e) { throw new Error(e) }
        parsedObj = r
    })
    let seriesArr = parsedObj['message:MessageGroup'].DataSet[0].Series

    let content = ''

    for (let i = 0; i < seriesArr.length; i++) {
        const obs_arr = seriesArr[i].Obs
        const reporter_a3 = seriesArr[i].SeriesKey[0].Value[0]['$'].value
        const method = seriesArr[i].SeriesKey[0].Value[3]['$'].value

        let ITIC_value
        for (let i = 0; i < obs_arr.length; i++) {
            if (obs_arr[i].Time[0] === '2018' && method === '1') {
                // console.log(method)
                ITIC_value = obs_arr[i].ObsValue[0]['$']['value']

                let newLine = `${reporter_a3},${method},${ITIC_value}\n`
                content = content.concat(newLine)
            }
        }
    }

    // console.log(content)

    fs.writeFile('this.csv', content, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Wrote some content!');
    });
}

pull()