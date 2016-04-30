import React from 'react';
import ProfileForm from './ProfileForm';

export default class App extends React.Component {

  render() {
    return (

      <div>
        <ProfileForm />

      </div>
    );
  }

};

export default class Wall extends React.Component {

  render() {
    return (

      <table className="trump-wall">
        <tbody>

          <Bricks />

        </tbody>
      </table>
    );
  }

};

export default class Bricks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      BrickCount: 0
    };
  }
//aRowofBricks
  layABrick = (event) => {
    //this.setState({BrickCount: this.state.BrickCount += 1});
  }

  render() {

    let unbuiltBricks = [];

    for (let i = 1; i <= 15; i++) {

      let newId = uuid.v4();

      unbuiltBricks.push(
        <Brick key={newId} id={newId} brickNo={i} />
      );
    }

    return (
      <tr onClick={this.layABrick.bind(this)}>
        {unbuiltBricks}
      </tr>
    );
  }
};

export default class Brick extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      BrickStyle: style.notBuilt
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    $('td').css('border', '1px solid #999');
    this.setState({BrickStyle: style.building});
    React.render('Hello', getElementById('build-heading'));
  }

  render() {

    return (
      <td className="bricks" style={this.state.BrickStyle} 
          onClick={this.handleClick.bind(this)}>
        #{this.props.brickNo}
      </td>
    )
  }

};

let style = {
  building: {
      border: "1px solid #ffd700"
  }
}
