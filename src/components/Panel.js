import React, { Component } from 'react'

export default class Panel extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    
    render() {
        return (

            <div className="col s12 m4">
                <div className="card-panel blue lighten-1 white-text center">
                    <h5>{this.props.cryptoCurrency}</h5>
                    <h3>${this.props.cryptoValue}</h3>
                </div>
            </div>

        )
    }
}
