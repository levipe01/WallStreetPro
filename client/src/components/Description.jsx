import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';



class Descripton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayContent: true
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
        <h2 onClick={this.handleClick}>Company Description</h2>
        <Collapse isOpened={this.state.displayContent}>
          <div>Random content</div>
        </Collapse>
      </div>

    );
  }
}


export default Descripton;