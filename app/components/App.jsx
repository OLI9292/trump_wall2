import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import uuid from 'node-uuid';
import '../main.css';
import CameraImage from '../images/camera.jpeg';
import TrumpOne from '../images/trump_one.jpg';


class ProfileForm extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="profileForm">
        <h3 id="build-heading">{this.props.BuildHeading}</h3>
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src={CameraImage}></img>
          </label>
          <input id="file-input" type="file"></input>
        </div>
        <input type="text" id="name" placeholder="Name: " />
        <input type="text" id="age" placeholder="Age: " />
        <input type="text" id="hometown" placeholder="Hometown: " />
        <textarea id="textarea" name="story" defaultValue="What's your story?" />
        <button id="build">BUILD</button>
      </form>
    );
  }
};
ProfileForm.propTypes = { BuildHeading: React.PropTypes.string };
ProfileForm.defaultProps = { BuildHeading:"Choose a Brick to Build" };

class ProfileView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profileView">
        <p id="brickNo">Brick #{this.props.selectedProfile.brickNo}</p>
        <p id="story">{this.props.selectedProfile.story}</p>
        <p id="information">{this.props.selectedProfile.name} ({this.props.selectedProfile.age}),
                             from {this.props.selectedProfile.hometown}</p>
      </div>
    );
  }
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileView: props.profileView, selectedProfile: props.profile};
  }

  changeView() {
    if (this.state.profileView) {
      this.setState({profileView: false});

    } else {
      this.setState({profileView: true});
    }   
  }

  changeProfile(brickOnView) {
    this.setState({selectedProfile: brickOnView});
  }

  render() {
    const view = () => {
      if (this.state.profileView) {
        return ( <ProfileView selectedProfile={this.state.selectedProfile} /> )
      } else {
        return ( <ProfileForm /> )
      }
    }
    return (
      <div id="wall">
        {view()}
        <Wall selectedProfile={this.props.selectedProfile} profileDisplayed={this.state.profileView} 
              changeView={this.changeView.bind(this)} changeProfile={this.changeProfile.bind(this)} />
        <img src={TrumpOne}></img>
      </div>
    );
  }
};
App.propTypes = { profileView: React.PropTypes.bool, profile: React.PropTypes.object };
App.defaultProps = { profileView: false, profile: { name: "", age: 0, hometown: "", story: "", brickNo: 0, showBrickCount: false } };

class Wall extends React.Component {

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


class Bricks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: props.ColumnCount,
                  profiles: props.ProfileColumn
    };
  }

  build() {

    if (this.props.profileDisplayed) {
      this.props.changeView();
    }

    let inputs = document.getElementsByTagName('input');
    let contact = {};

    for (let i=0;i<inputs.length;i++) {
      if (inputs[i].getAttribute('id')==='name') {
        if (inputs[i].value==='') {
          alert('Please enter your name');
          return;
        }
        contact['name'] = inputs[i].value
      }
      if (inputs[i].getAttribute('id')==='age') {
        if (inputs[i].value==='') {
          //alert('Please enter your age');
          //return;
        }
        contact['age'] = inputs[i].value
      }
      if (inputs[i].getAttribute('id')==='hometown') {
        if (inputs[i].value==='') {
          //alert('Please enter your hometown');
          //return;
        }
        contact['hometown'] = inputs[i].value
      }
    }

    let story = document.getElementById('textarea').value;
    if (story!=="What's your story?") {
      contact['story'] = story;
    } else {
      contact['story'] = '';
    }

    contact['brickNo'] = this.props.totalCount;

    let newProfilesState = this.state.profiles;
    newProfilesState[newProfilesState.length - 1] = contact;
    this.setState({profiles: newProfilesState.concat(1), count: ++this.state.count});
    this.props.increment();
  }

  reveal(rowNo) {
    if (!this.props.profileDisplayed) {
      this.props.changeView();
    }
    this.props.changeProfile(this.state.profiles[rowNo-1]);
  }

  brickClicked(rowCount, rowNo) {
    console.log(this.state.profiles2);
    if (rowCount !== rowNo) {
      this.reveal(rowNo);
    } else {
      this.build();
    }
  }

  mouveEnter(count) {
    this.setState({showBrickCount: true});
  }
  mouseLeave() {
    this.setState({showBrickCount: false});
    console.log(this.state.showBrickCount);
  }
//{this.state.profiles.length === 1 ? "" : this.state.profiles[this.state.profiles.length-index-1].name}
  render() {

    let bricks = this.state.profiles.map((brick, index) => {
      return (
        <tr key={uuid.v4()}>
          <td onClick={this.brickClicked.bind(this, this.state.count, this.state.profiles.length-index)} 
            onMouseEnter={this.mouveEnter.bind(this, this.state.count)} onMouseLeave={this.mouseLeave.bind(this)}
            style={index === 0 ? style.styleNotBuilt : style.styleBuilt} >
            {this.state.showBrickCount ? this.state.count : this.state.profiles.length === 1 ? "" : this.state.profiles[this.state.profiles.length-index-1].name}
          </td>
        </tr>
      )
    })

    return (
      <tbody>
        {bricks}
      </tbody>
    );
  }
};

Bricks.propTypes = { ProfileColumn: React.PropTypes.array, ColumnCount: React.PropTypes.number,
                     incrementTotal: React.PropTypes.func };
Bricks.defaultProps = { ProfileColumn: _.range(1).map(function () { return {name: ''} }), ColumnCount: 1 };

let style = {
  styleBuilt: {
    border: '1px solid yellow'
  },
  styleNotBuilt: {
    border: '.5px solid #ffd700',
    background: 'rgba(255,255,255,0.3)'
  }
}
