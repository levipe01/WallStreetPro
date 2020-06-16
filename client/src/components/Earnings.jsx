import React from 'react';
import { Collapse } from 'react-collapse';
import PropTypes from 'prop-types';

class Earnings extends React.Component {
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
      earnInfo,
    } = this.props;

    return (
      <div className='company-earnings'>
        <h2 className='info-header' onClick={this.handleClick}>Earnings</h2>
        {
          earnInfo.earnings
            && <Collapse isOpened={this.state.displayContent}>
              <table cellSpacing="0" cellPadding="0" className='earnings-table'>
                <tbody>
                  <tr>
                    <th></th>
                    <th>{earnInfo.earnings[0].fiscalPeriod}</th>
                    <th>{earnInfo.earnings[1].fiscalPeriod}</th>
                    <th>{earnInfo.earnings[2].fiscalPeriod}</th>
                    <th>{earnInfo.earnings[3].fiscalPeriod}</th>
                  </tr>
                  <tr>
                    <td>Actual EPS</td>
                    <td>${earnInfo.earnings[0].actualEPS}</td>
                    <td>${earnInfo.earnings[1].actualEPS}</td>
                    <td>${earnInfo.earnings[2].actualEPS}</td>
                    <td>${earnInfo.earnings[3].actualEPS}</td>
                  </tr>
                  <tr>
                    <td>Consensus EPS</td>
                    <td>${earnInfo.earnings[0].consensusEPS}</td>
                    <td>${earnInfo.earnings[1].consensusEPS}</td>
                    <td>${earnInfo.earnings[2].consensusEPS}</td>
                    <td>${earnInfo.earnings[3].consensusEPS}</td>
                  </tr>
                  <tr>
                    <td># of Estimates</td>
                    <td>{earnInfo.earnings[0].numberOfEstimates}</td>
                    <td>{earnInfo.earnings[1].numberOfEstimates}</td>
                    <td>{earnInfo.earnings[2].numberOfEstimates}</td>
                    <td>{earnInfo.earnings[3].numberOfEstimates}</td>
                  </tr>
                  <tr>
                    <td>Surprise Amount</td>
                    <td>${earnInfo.earnings[0].EPSSurpriseDollar}</td>
                    <td>${earnInfo.earnings[1].EPSSurpriseDollar}</td>
                    <td>${earnInfo.earnings[2].EPSSurpriseDollar}</td>
                    <td>${earnInfo.earnings[3].EPSSurpriseDollar}</td>
                  </tr>
                  <tr>
                    <td>Year Ago EPS</td>
                    <td>${earnInfo.earnings[0].yearAgo}</td>
                    <td>${earnInfo.earnings[1].yearAgo}</td>
                    <td>${earnInfo.earnings[2].yearAgo}</td>
                    <td>${earnInfo.earnings[3].yearAgo}</td>
                  </tr>
                  <tr>
                    <td>Year Ago Chng</td>
                    <td>${earnInfo.earnings[0].yearAgoChangePercent.toFixed(2)}</td>
                    <td>${earnInfo.earnings[1].yearAgoChangePercent.toFixed(2)}</td>
                    <td>${earnInfo.earnings[2].yearAgoChangePercent.toFixed(2)}</td>
                    <td>${earnInfo.earnings[3].yearAgoChangePercent.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Report Date</td>
                    <td>{earnInfo.earnings[0].EPSReportDate}</td>
                    <td>{earnInfo.earnings[1].EPSReportDate}</td>
                    <td>{earnInfo.earnings[2].EPSReportDate}</td>
                    <td>{earnInfo.earnings[3].EPSReportDate}</td>
                  </tr>
                </tbody>
              </table>
            </Collapse>
        }
      </div>
    );
  }
}

Earnings.propTypes = {
  earnInfo: PropTypes.shape({
    earnings: PropTypes.arrayOf(
      PropTypes.shape({
        EPSReportDate: PropTypes.string,
        yearAgoChangePercent: PropTypes.number,
        yearAgo: PropTypes.number,
        EPSSurpriseDollar: PropTypes.number,
        fiscalPeriod: PropTypes.string,
        numberOfEstimates: PropTypes.number,
        consensusEPS: PropTypes.number,
        actualEPS: PropTypes.number,
      }),
    ),
  }),
};

export default Earnings;
