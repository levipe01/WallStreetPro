import React from 'react';
import Description from './Description.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>The Secaucus Observer</h1>
        <Description />
      </div>
    );
  }
}

export default App;