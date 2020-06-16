import React from 'react';
import { Collapse } from 'react-collapse';
import PropTypes from 'prop-types';

class Descripton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayContent: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const newState = !this.state.displayContent;
    this.setState({
      displayContent: newState,
    });
  }

  render() {
    const {
      desInfo,
    } = this.props;

    return (
      <div className='company-description'>
        <h2 className='info-header' onClick={this.handleClick}>Overview</h2>
        <Collapse isOpened={this.state.displayContent}>
          <div><b>Exchange:</b> {desInfo.exchange}</div>
          <div><b>Industry:</b> {desInfo.industry}</div>
          <div><b>Sector:</b> {desInfo.sector}</div>
          <div><b>Website:</b> {desInfo.website}</div>
          <br></br>
          <div>{desInfo.description}</div>
          <br></br>
          <div><b>CEO:</b> {desInfo.CEO}</div>
          <div><b>Employees:</b> {desInfo.employees}</div>
          <h3>Address:</h3>
          <div>{desInfo.address}</div>
          <div>{desInfo.city}, {desInfo.state}</div>
          <div>{desInfo.zip} {desInfo.country}</div>
          <br></br>
          <div><b>Phone:</b> {desInfo.phone}</div>
        </Collapse>
      </div>

    );
  }
}

Descripton.propTypes = {
  desInfo: PropTypes.shape({
    exchange: PropTypes.string,
    industry: PropTypes.string,
    sector: PropTypes.string,
    description: PropTypes.string,
    CEO: PropTypes.string,
    employees: PropTypes.number,
    address: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    website: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default Descripton;
