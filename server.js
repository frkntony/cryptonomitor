// server.js
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher') // pusher SDK for real-time updates
const HTTP_PORT = process.env.PORT || 5000; // heroku port

// dbg data
// let dummyprices = {
//     role: "debuger"
// }

// my pusher setup
const pusher = new Pusher({
  appId: '593364',
  key: '8d30ce41f530c3ebe6b0',
  secret: '8598161f533c653455be',
  cluster: 'eu',
  encrypted: true
})

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})


// gets info from the route above, triggers pusher event and sends data to 'coin-prices channel'
// my front-end has a subscription on this room; thus, my page dynamically update e.g. real-time
app.post('/prices/new', (req, res) => {
  // console.log('inside')
  // console.log(req.body.prices)
  // Trigger the 'prices' event to the 'coin-prices' channel
  pusher.trigger('coin-prices', 'prices', {
    prices: req.body.prices
  });
  res.sendStatus(200)
})


// serves my build directory
app.use(express.static(path.join(__dirname, 'build')))

// handles all requests from my front-end
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(HTTP_PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Cryptonomitor is hosted on: ' + HTTP_PORT)
  }
})