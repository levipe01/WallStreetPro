import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';

class Earnings extends React.Component {
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
      <div className='company-earnings'>
        <h2 className='info-header' onClick={this.handleClick}>Earnings</h2>
        {
          this.props.earnInfo.earnings
            &&
            <Collapse isOpened={this.state.displayContent}>
              <table className='earnings-table'>
                <tbody>
                  <tr>
                    <th></th>
                    <th>{this.props.earnInfo.earnings[0].fiscalPeriod}</th>
                    <th>{this.props.earnInfo.earnings[1].fiscalPeriod}</th>
                    <th>{this.props.earnInfo.earnings[2].fiscalPeriod}</th>
                    <th>{this.props.earnInfo.earnings[3].fiscalPeriod}</th>
                  </tr>
                  <tr>
                    <td>Actual EPS</td>
                    <td>${this.props.earnInfo.earnings[0].actualEPS}</td>
                    <td>${this.props.earnInfo.earnings[1].actualEPS}</td>
                    <td>${this.props.earnInfo.earnings[2].actualEPS}</td>
                    <td>${this.props.earnInfo.earnings[3].actualEPS}</td>
                  </tr>
                  <tr>
                    <td>Consensus EPS</td>
                    <td>${this.props.earnInfo.earnings[0].consensusEPS}</td>
                    <td>${this.props.earnInfo.earnings[1].consensusEPS}</td>
                    <td>${this.props.earnInfo.earnings[2].consensusEPS}</td>
                    <td>${this.props.earnInfo.earnings[3].consensusEPS}</td>
                  </tr>
                  <tr>
                    <td>Number of Estimates</td>
                    <td>{this.props.earnInfo.earnings[0].numberOfEstimates}</td>
                    <td>{this.props.earnInfo.earnings[1].numberOfEstimates}</td>
                    <td>{this.props.earnInfo.earnings[2].numberOfEstimates}</td>
                    <td>{this.props.earnInfo.earnings[3].numberOfEstimates}</td>
                  </tr>
                  <tr>
                    <td>Surprise Amount</td>
                    <td>${this.props.earnInfo.earnings[0].EPSSurpriseDollar}</td>
                    <td>${this.props.earnInfo.earnings[1].EPSSurpriseDollar}</td>
                    <td>${this.props.earnInfo.earnings[2].EPSSurpriseDollar}</td>
                    <td>${this.props.earnInfo.earnings[3].EPSSurpriseDollar}</td>
                  </tr>
                  <tr>
                    <td>Year Ago EPS</td>
                    <td>${this.props.earnInfo.earnings[0].yearAgo}</td>
                    <td>${this.props.earnInfo.earnings[1].yearAgo}</td>
                    <td>${this.props.earnInfo.earnings[2].yearAgo}</td>
                    <td>${this.props.earnInfo.earnings[3].yearAgo}</td>
                  </tr>
                  <tr>
                    <td>Year Ago Chng</td>
                    <td>${this.props.earnInfo.earnings[0].yearAgoChangePercent}</td>
                    <td>${this.props.earnInfo.earnings[1].yearAgoChangePercent}</td>
                    <td>${this.props.earnInfo.earnings[2].yearAgoChangePercent}</td>
                    <td>${this.props.earnInfo.earnings[3].yearAgoChangePercent}</td>
                  </tr>
                  <tr>
                    <td>Report Date</td>
                    <td>{this.props.earnInfo.earnings[0].EPSReportDate}</td>
                    <td>{this.props.earnInfo.earnings[1].EPSReportDate}</td>
                    <td>{this.props.earnInfo.earnings[2].EPSReportDate}</td>
                    <td>{this.props.earnInfo.earnings[3].EPSReportDate}</td>
                  </tr>
                </tbody>
              </table>
            </Collapse>
        }
      </div>
    );
  }
}


export default Earnings;