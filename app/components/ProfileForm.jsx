import React from 'react';
import '../main.css';
import CameraImage from '../images/camera.jpeg';

export default class ProfileForm extends React.Component{
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
