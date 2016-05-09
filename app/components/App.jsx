import React from 'react';
import ReactDOM from 'react-dom';
import TrumpOne from '../images/trump_one.jpg';
import '../main.css';
import ProfileForm from './ProfileForm'
import ProfileView from './ProfileView'
import Wall from './Wall'


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
