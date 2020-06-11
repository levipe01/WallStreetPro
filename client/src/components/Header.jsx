import React from 'react';
import moment from "moment";


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      watchlist_name: '',
      newWatchlist: false,
      updateWatchlist: false,
      newWatchlistName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.toggleNewWatchlist = this.toggleNewWatchlist.bind(this);
    this.toggleUpdateWatchlist = this.toggleUpdateWatchlist.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddChange =  this.handleAddChange.bind(this);
  }

  toggleNewWatchlist() {
    const newState = !this.state.newWatchlist;
    this.setState({
      newWatchlist: newState,
    });
  }

  toggleUpdateWatchlist() {
    const newState = !this.state.updateWatchlist;
    this.setState({
      updateWatchlist: newState,
    });
  }

  handleAdd() {
    this.props.addWatchlist(this.state.newWatchlistName)
    this.toggleNewWatchlist()
  }

  handleAddChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateTicker(this.state.ticker)
    this.props.checkWatchlist(this.state.ticker)
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleDropdown(e) {
    this.props.getCurrentWatchlist(Number(e.target.value))
    this.setState({
      watchlist_name: e.target.value,
    })
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
          <form className='ticker-search'>
            <label htmlFor="fname">Search: </label>
            <input type="text" id="ticker" name="ticker" value={this.state.ticker} onChange={this.handleUpdate}></input>
            <input className='submit-button' type="submit" value="Submit" onClick={this.handleSubmit}></input>
          </form>
          <div className="index-prices">
            <span><b>DJIA</b> 27110.98 <span style={{color:'rgba(13,236,13,1)'}}>3.15%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>SP500</b> 3193.93 <span style={{color:'rgba(13,236,13,1)'}}>2.62%</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><b>Nasdaq</b> 9814.08 <span style={{color:'rgba(13,236,13,1)'}}>2.06%</span></span>
          </div>
          <div className='watchlist-update'>Watchlist:
            {
              !this.state.newWatchlist
                ? <select className="watchlist-dropdown" value={this.state.watchlist_name} onChange={this.handleDropdown}>
                    {
                      this.props.watchlists.map((watchlist) => {
                      return (<option value={watchlist.id} name={watchlist.name}>{watchlist.name}</option>)
                      })
                    }
                  </select>
                : <input className='new-watchlist' name='newWatchlistName' onChange={this.handleAddChange} value={this.state.newWatchlistName}></input>
            }

            {
              !this.state.newWatchlist
                ? <button onClick={this.toggleNewWatchlist}>Create New</button>
                : <div>
                    <button onClick={this.handleAdd}>Add</button>
                    <button onClick={this.toggleNewWatchlist}>Cancel</button>
                  </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Header;