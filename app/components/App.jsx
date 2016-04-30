import React from 'react';
import _ from 'underscore';
import uuid from 'node-uuid';

class ProfileForm extends React.Component{
  render() {
    return (
      <form className="profileForm">
        <h3 id="build-heading">Choose a brick to build</h3>
        <input type="file" />
        <input type="text" placeholder="Name: " />
        <input type="age" placeholder="Age: " />
        <input type="hometown" placeholder="Hometown: " />
        <textarea name="story" defaultValue="What's your story?" />
        <button>BUILD</button>
      </form>
    );
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProfileForm />
        <Wall />
      </div>
    );
  }
};

class Wall extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const columns = this.props.columns.map((column) => {
      return (
        <table style={{marginLeft: column/14*75 - 5 + '%'}} key={column}>
          <tbody>
            <Bricks column={column} />
          </tbody>
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

Wall.propTypes = { columns: React.PropTypes.array };
Wall.defaultProps = { columns: _.range(1,15) };

class Bricks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount,
                  rows: props.rowsCount
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({rows: this.state.rows.concat(1)});
  }

  render() {
    let bricks = this.state.rows.map((brick) => {
      return (
        <tr>
          <Brick key={uuid.v4()} />
        </tr>
      )
    })

    return (
      <div onClick={this.handleClick}>
        {bricks}
      </div>
    );
  }
};

Bricks.propTypes = { rowsCount: React.PropTypes.array };
Bricks.defaultProps = { rowsCount: [1], initialCount: 0 };

class Brick extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <td></td>
    );
  }
};

