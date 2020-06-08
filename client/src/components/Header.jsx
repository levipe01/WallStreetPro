import React from 'react';
import moment from "moment";


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateTicker(this.state.ticker);
    console.log(this.props)
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="header-main">
        <div className="header-top">
          <span className='date-time'>{moment().format('LLLL')}</span>
          <h1>THE SECAUCUS SENTINEL.</h1>
          <span className='sign-up'>Sign Up</span>
        </div>
        <div className='input-bar'>
          <form className='ticker-search'>
            <label htmlFor="fname">Ticker: </label>
            <input type="text" id="ticker" name="ticker" value={this.state.ticker} onChange={this.handleUpdate}></input>
            <input className='submit-button' type="submit" value="Submit" onClick={this.handleSubmit}></input>
          </form>
          <div className="index-prices">
            <span><b>DJIA</b> 27110.98 <span style={{color:'rgba(13,236,13,1)'}}>3.15%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>SP500</b> 3193.93 <span style={{color:'rgba(13,236,13,1)'}}>2.62%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>Nasdaq</b> 9814.08 <span style={{color:'rgba(13,236,13,1)'}}>2.06%</span></span>
          </div>
          <div className='watchlist-update'>Watchlist:
            <select className="watchlist-dropdown">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
            <button>Create New</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Header;