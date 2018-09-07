import React, { Component } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'
import Panel from './Panel';

export default class Today extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bitcoin: '',
      ethereum: '',
      litecoin: ''
    }
  }


  // get default crypto values and stores them to state & local storage
  getDefaultCryptoValues = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(response => {

        this.setState({ bitcoin: response.data.BTC.USD }, () =>
          localStorage.setItem('BTC', this.state.bitcoin)
        )

        this.setState({ ethereum: response.data.ETH.USD }, () =>
          localStorage.setItem('ETH', response.data.ETH.USD)
        )

        this.setState({ litecoin: response.data.LTC.USD }, () =>
          localStorage.setItem('LTC', response.data.LTC.USD)
        )
      })
      .catch(error => {
        console.log(error)
      })
  } // ./getDefaultCryptoValues



  // that's basically my realtime updater
  // sends data fetched from api to my node server
  // server than triggers pusher's event and this event updates values in React
  // React --> Node --> Pusher --> React

  updateCryptoValues = (coinData) => {
    axios.post('/prices/new', {
      prices: coinData
    })
      .then(response => {
        // console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  } // ./updateCryptoValues


  // calls api and fetches new values for coins
  getNewCruptoData = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(response => {
        // console.log('API call')
        // console.log(response.data)
        this.updateCryptoValues(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  } // ./getNewCryptoData

  componentWillMount = () => {

    // default values
    this.getDefaultCryptoValues()
  } // ./componentWillMount


  componentDidMount = () => {

    // my pusher setup
    // API_KEY + cluster
    const pusher = new Pusher('8d30ce41f530c3ebe6b0', {
      cluster: 'eu',
      encrypted: true
    })

    // I subscribe to my channel
    this.prices = pusher.subscribe('coin-prices')


    if (!navigator.onLine) {
      this.setState({ bitcoin: localStorage.getItem('BTC') })
      this.setState({ ethereum: localStorage.getItem('ETH') })
      this.setState({ litecoin: localStorage.getItem('LTC') })
    }


    // monitors API for changes & updates the state of coins
    setInterval(() => {
      this.getNewCruptoData()
    }, 10000)


    // pushers hook. it monitors for changes and responds to pusher.trigger event.
    this.prices.bind('prices', price => {
      // console.log('this happened')

      this.setState({ bitcoin: price.prices.BTC.USD }, () =>
        localStorage.setItem('BTC', this.state.bitcoin)
      )

      this.setState({ ethereum: price.prices.ETH.USD }, () =>
        localStorage.setItem('ETH',this.state.ethereum)
      )

      this.setState({ litecoin: price.prices.LTC.USD }, () =>
        localStorage.setItem('LTC', this.state.litecoin)
      )

    }, this);
  } // ./componentDidMount()

  render() {
    return (
      <div className="row">

        <Panel cryptoCurrency={'1 BTC'} cryptoValue={this.state.bitcoin} />
        <Panel cryptoCurrency={'1 ETH'} cryptoValue={this.state.ethereum} />
        <Panel cryptoCurrency={'1 LTC'} cryptoValue={this.state.litecoin} />

      </div>
    )
  }
}
