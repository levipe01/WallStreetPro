import React from 'react';
import PropTypes from 'prop-types';

const axios = require('axios').default;

class WatchlistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      watchlist_name: '',
      watchlist_id: '',
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deleteWatchlist = this.deleteWatchlist.bind(this);
    this.editWatchlist = this.editWatchlist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.setState({
      watchlist_name: this.props.watchlist.name,
      watchlist_id: this.props.watchlist.id,
    });
  }

  handleSelect() {
    this.props.updateCurrentWatchlist(this.state.watchlist_id, this.state.watchlist_name);
  }

  deleteWatchlist() {
    axios.delete(`/data/watchlist?watchlist_id=${this.state.watchlist_id}`)
      .then(() => {
        this.props.getWatchlists();
      })
      .catch((err) => err);
  }

  toggleEditMode() {
    const newState = !this.state.editMode;
    this.setState({
      editMode: newState,
    });
  }

  editWatchlist() {
    const options = {
      watchlist_name: this.state.watchlist_name,
      watchlist_id: this.state.watchlist_id,
    };
    axios.put('/data/watchlist', options)
      .then(() => {
        this.toggleEditMode();
        this.props.getWatchlists(this.state.watchlist_id);
      })
      .catch((err) => err);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <li className='watchlist-item' onClick={this.handleSelect} value={this.state.watchlist_name}>
        {
          !this.state.editMode
            ? <div value={this.state.watchlist_name} className='wl-item-name'>{this.state.watchlist_name}</div>
            : <input value={this.state.watchlist_name} name='watchlist_name' className='wl-item-edit'
               onChange={this.handleChange} defaultValue={this.state.watchlist_name}></input>
        }
        <div className='wl-item-buttons'>
          {
            !this.state.editMode
              ? <button className='edit-button' onClick={this.toggleEditMode}>
                  <i className="fa fa-pencil"></i>
                </button>
              : <button className='edit-button' onClick={this.editWatchlist}>
                  <i className="fa fa-check"></i>
                </button>
          }
          <button className='delete-button' onClick={this.deleteWatchlist}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </li>
    );
  }
}

WatchlistItem.propTypes = {
  getWatchlists: PropTypes.func.isRequired,
  updateCurrentWatchlist: PropTypes.func.isRequired,
  watchlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default WatchlistItem;
