import React, { Component } from 'react'

export default class HistoryEntry extends Component {
    render() {
        return (
            <div>
                <div className="col s12">
                    <div className="card-panel blue lighten-1 white-text center">
                        <h5>{this.props.currentDay}</h5>
                        <div className="row">
                            <div className="col s12 m4"> <div className="card-panel white lighten-1 blue-text center"><h5>BTC <br /> ${this.props.btcValue}</h5></div></div>
                            <div className="col s12 m4"> <div className="card-panel white lighten-1 blue-text center"><h5>ETH <br /> ${this.props.ethValue}</h5></div></div>
                            <div className="col s12 m4"> <div className="card-panel white lighten-1 blue-text center"><h5>LTC <br /> ${this.props.ltcValue}</h5></div></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
