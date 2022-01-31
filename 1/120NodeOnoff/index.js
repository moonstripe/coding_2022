const express = require('express')
const Gpio = require('onoff').Gpio;
const led = new Gpio(15, 'out')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send(`light is ${led.readSync() === 0 ? 'off' : 'on'}`)
})

app.get('/turnon', async (req, res) => {
  led.writeSync(1)
  res.send('light on')
})

app.get('/turnoff', async (req, res) => {
  led.writeSync(0)
  res.send('light off')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
