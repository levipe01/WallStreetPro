import React from 'react';
import WatchlistItem from './WatchlistItem.jsx'

const axios = require('axios').default;

class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlist_name: '',
      newWatchlistName: '',
      editMode: false,
      watchlists: [],
    }

    // this.editWatchlists = this.editWatchlists.bind(this);
    this.getWatchlists = this.getWatchlists.bind(this);
    this.addWatchlist =  this.addWatchlist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentWatchlist = this.updateCurrentWatchlist.bind(this);
  }

  componentDidMount() {
    this.getWatchlists()
  }


  updateCurrentWatchlist(id, name) {
    this.props.getCurrentWatchlist(id)
    this.setState({
      watchlist_name: name,
    })
  }

  getWatchlists(watchlistId) {
    return axios.get(`/data/watchlist?user_id=${this.props.user_id}`)
      .then((response) => {
        this.setState({
          watchlists: response.data,
          watchlist_name: this.state.newWatchlistName || response.data[0].name,
        }, () => {
          this.props.getWatchlistData()
            .then(() => this.props.getCurrentWatchlist(watchlistId || response.data[0].id))
        })
      })
      .catch((err) => err);
  }

  addWatchlist() {
    const options = {
      user_id: this.props.user_id,
      watchlist_name: this.state.newWatchlistName
    }
    axios.post(`/data/watchlist`, options)
      .then((response) => {return this.getWatchlists(response.data)})
      .then(() => {
        this.setState({
          newWatchlistName: '',
        })
      })
      .catch((err) => err);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // editWatchlists(action, id, name) {             //possibly used for re-rendering watchlists without API Call
  //   let newWatchlists = this.state.watchlists.splice()
  //   const watchlistIndex = this.state.watchlists.indexOf(id)
  //   if (action === 'delete') {
  //     newWatchlists.splice(watchlistIndex, 1)
  //   } else if (aciton === 'add') {
  //     newWatchlist.push(id)
  //   }
  //   this.setState({
  //     watchlists: newWatchlists
  //   })
  // }

  render() {
    return (
      <div className='dropdown'>
      <button className='dropbtn'>{this.state.watchlist_name}</button>
        <ul className='dropdown-content' value={this.state.watchlist_name}>
          {
            this.state.watchlists.map((watchlist) => {
              return (
                <WatchlistItem key={watchlist.id} watchlist={watchlist} getWatchlists={this.getWatchlists} updateCurrentWatchlist={this.updateCurrentWatchlist}/>
              )
            })
          }
          {
            <li className='watchlist-item'>
              <input autoComplete="off" placeholder='New Watchlist' className='watchlist-input' name='newWatchlistName' onChange={this.handleChange} value={this.state.newWatchlistName}></input>
              <div >
                <button className='plus-button' onClick={this.addWatchlist}><i className="fa fa-plus"></i></button>
              </div>
            </li>
          }
        </ul>
    </div>
    );
  }
}

export default Watchlist;