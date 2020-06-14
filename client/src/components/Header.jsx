import React from 'react';
import moment from "moment";
import Watchlist from './Watchlist.jsx'


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
    this.props.checkWatchlist(this.state.ticker)
      .then(() => {
        this.setState({
          ticker: '',
        })
      })
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
          <div className='logo-wrapper'>
            <img className='logo' src="stock-market.png" />
            <h1>WallStreetPro</h1>
          </div>
          <span className='sign-up'>Sign Up</span>
        </div>
        <div className='input-bar'>
          <form className='ticker-search' autoComplete="off">
            <input type="text" id="ticker" name="ticker" value={this.state.ticker} placeholder='Search' onChange={this.handleUpdate}></input>
            <input className='submit-button' type="submit" value="Submit" onClick={this.handleSubmit}></input>
          </form>
          <div className="index-prices">
            <span><b>DJIA</b> 27110.98 <span style={{color:'rgba(13,236,13,1)'}}>3.15%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>SP500</b> 3193.93 <span style={{color:'rgba(13,236,13,1)'}}>2.62%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>Nasdaq</b> 9814.08 <span style={{color:'rgba(13,236,13,1)'}}>2.06%</span></span>
          </div>
          <Watchlist getWatchlistData={this.props.getWatchlistData} getCurrentWatchlist={this.props.getCurrentWatchlist} user_id={this.props.user_id} watchlists={this.props.watchlists} checkWatchlist={this.props.checkWatchlist}/>
        </div>
      </div>
    );
  }
}

export default Header;