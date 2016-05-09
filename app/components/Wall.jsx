import React from 'react';
import '../main.css';
import _ from 'underscore';
import uuid from 'node-uuid';
import Bricks from './Bricks';

export default class Wall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {totalCount: props.TotalCount,
                  profiles: props.ProfileColumn
    };
  }

  incrementTotal() {
    this.setState({totalCount: ++this.state.totalCount});
  }

  render() {
    const columns = this.props.columns.map((column) => {
      return (
        <table style={{marginLeft: column*5.3-5+'%'}} key={column}>
            <Bricks changeView={this.props.changeView} totalCount={this.state.totalCount} 
                    increment={this.incrementTotal.bind(this)} profileDisplayed={this.props.profileDisplayed} 
                    column={column} changeProfile={this.props.changeProfile} />
        </table>
      )
    })

    return (
      <div className="trump-columns">
        {columns}
      </div>
    );
  }
};
Wall.propTypes = { columns: React.PropTypes.array, TotalCount: React.PropTypes.number };
Wall.defaultProps = { columns: _.range(1,16), TotalCount: 1 };
