import React from 'react';
import '../main.css';

export default class ProfileView extends React.Component{
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
