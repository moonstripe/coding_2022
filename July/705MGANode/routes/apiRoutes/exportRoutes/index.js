const router = require('express').Router()
const exportLogic = require('./../../../controllers/exportController')

router.get('/', (req, res) => {
    res.send('hello export route')
})

router.post('/calculateMirrorGap', async (req, res) => {
    try {

        // build Tariff map
        const tariffData = await exportLogic.getTariffData(req, res)

        // build ITIC map
        const iticData = await exportLogic.getITICData(req, res);

        // pull Export and Import data, calculate key stats, build return data map
        const tradeGapData = await exportLogic.getComtradeData(req, res, iticData, tariffData);

        res.json(tradeGapData)

    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router