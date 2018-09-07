import React, { Component } from 'react';

import Today from './components/Today'
import History from './components/History'
import './App.css';

class App extends Component {
  render() {
    return (

      <div>
        <nav className="blue darken-2">
          <div clasName="container">
            <div className="nav-wrapper">
              <a href="index.html" className="brand-logo">Cryptonomitor</a>
              <a href="/" data-activates="side-nav" className="button-collapse show-on-large right">
                <i className="material-icons">menu</i>
              </a>



              <ul id="side-nav" className="side-nav">
                <li>
                  <div className="user-view">
                    <div className="background">
                      <img src="img/bg.jpg" alt="" />
                    </div>
                    <div style={{'height': '100px'}}></div>
                  </div>
                </li>
                <li>
                  <a href="index.html">
                    <i className="material-icons">dashboard</i> Dashboard</a>
                </li>

                <li>
                  <div className="divider"></div>
                </li>
                <li>
                <a href="https://github.com/frkntony/cryptonomitor">Source Code</a>
                </li>

              </ul>
            </div>
          </div>
        </nav>

        <div className="spacer"></div>

        <Today />
        <History />

      </div>
    );
  }
}

export default App;