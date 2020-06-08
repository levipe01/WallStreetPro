import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';

class Descripton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayContent: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    let newState = !this.state.displayContent
    this.setState({
      displayContent: newState
    })
  }

  render() {


    return (
      <div className='company-description'>
        <h2 className='info-header' onClick={this.handleClick}>Overview</h2>
        <Collapse isOpened={this.state.displayContent}>
          <div><b>Exchange:</b> {this.props.desInfo.exchange}</div>
          <div><b>Industry:</b> {this.props.desInfo.industry}</div>
          <div><b>Sector:</b> {this.props.desInfo.sector}</div>
          <div><b>Website:</b> {this.props.desInfo.website}</div>
          <br></br>
          <div>{this.props.desInfo.description}</div>
          <br></br>
          <div><b>CEO:</b> {this.props.desInfo.CEO}</div>
          <div><b>Employees:</b> {this.props.desInfo.employees}</div>
          <h3>Address:</h3>
          <div>{this.props.desInfo.address}</div>
          <div>{this.props.desInfo.city}, {this.props.desInfo.state}</div>
          <div>{this.props.desInfo.zip} {this.props.desInfo.country}</div>
          <br></br>
          <div><b>Phone:</b> {this.props.desInfo.phone}</div>
        </Collapse>
      </div>

    );
  }
}


export default Descripton;