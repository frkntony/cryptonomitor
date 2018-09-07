import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import HistoryEntry from './HistoryEntry'

// TO:DO - add all onjects to an array
// loop array of objects
// createBetterHistory - mb even infinitescroll

class History extends Component {

  constructor(props) {
    super(props)

    // today
    // oneDayAgo
    // twoDaysAgo
    // threeDaysAgo
    // fourDaysAgo

    this.state = {
      today: {},
      oneDayAgo: {},
      twoDaysAgo: {},
      threeDaysAgo: {},
      fourDaysAgo: {}
    }
  } // ./constructor


  getBTCPrices = (date) => {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
  } // ./getBTCPrices


  getETHPrices = (date) => {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
  } // ./getETHPrices


  getLTCPrices = (date) => {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
  } // ./getLTCPrices


  // a template for coin history
  // sets up state and local storage
  setCoinHistoryValues = (dayValue, stateValue) => {
    let t = moment().subtract(dayValue, 'days').unix();
    let f;
    axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
      .then(axios.spread((eth, btc, ltc) => {
        f = {
          date: moment.unix(t).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }

        this.setState({ [stateValue] : f }, () => {
          localStorage.setItem(stateValue, JSON.stringify(f))
        })
        // console.log('inside template axios')
        // console.log(f)
      }));
  }

  getCoinHistory = () => {

    // setting state and localStorage with my template
    this.setCoinHistoryValues(0, 'today')
    this.setCoinHistoryValues(1, 'oneDayAgo')
    this.setCoinHistoryValues(2, 'twoDaysAgo')
    this.setCoinHistoryValues(3, 'threeDaysAgo')
    this.setCoinHistoryValues(4, 'fourDaysAgo')
  } // ./getCoinHistory

  componentDidMount = () => {
    this.getCoinHistory()
    if (!navigator.onLine) {
      this.setState({ today: JSON.parse(localStorage.getItem('today')) })
      this.setState({ oneDayAgo: JSON.parse(localStorage.getItem('oneDayAgo')) })
      this.setState({ twoDaysAgo: JSON.parse(localStorage.getItem('twoDaysAgo')) })
      this.setState({ threeDaysAgo: JSON.parse(localStorage.getItem('threeDaysAgo')) })
      this.setState({ fourDaysAgo: JSON.parse(localStorage.getItem('fourDaysAgo')) })
    }
  } // ./componentDidMount


  render() {
    return (
  
      <div>
        <div className="row">
          <HistoryEntry currentDay={this.state.today.date}
            btcValue={this.state.today.btc}
            ethValue={this.state.today.eth}
            ltcValue={this.state.today.ltc} />
        </div>
        <div className="row">
          <HistoryEntry currentDay={this.state.oneDayAgo.date}
            btcValue={this.state.oneDayAgo.btc}
            ethValue={this.state.oneDayAgo.eth}
            ltcValue={this.state.oneDayAgo.ltc} />
        </div>
        <div className="row">
          <HistoryEntry currentDay={this.state.twoDaysAgo.date}
            btcValue={this.state.twoDaysAgo.btc}
            ethValue={this.state.twoDaysAgo.eth}
            ltcValue={this.state.twoDaysAgo.ltc} />
        </div>
        <div className="row">
          <HistoryEntry currentDay={this.state.threeDaysAgo.date}
            btcValue={this.state.threeDaysAgo.btc}
            ethValue={this.state.threeDaysAgo.eth}
            ltcValue={this.state.threeDaysAgo.ltc} />
        </div>
        <div className="row">
          <HistoryEntry currentDay={this.state.fourDaysAgo.date}
            btcValue={this.state.fourDaysAgo.btc}
            ethValue={this.state.fourDaysAgo.eth}
            ltcValue={this.state.fourDaysAgo.ltc} />
        </div>
      </div>
    )
  }
}

export default History;