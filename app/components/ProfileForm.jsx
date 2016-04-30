import React from 'react';

const ProfileForm = React.createClass({

  render: () => {
    return (

      <form className="profileForm">

        <h3 id="build-heading">Choose a brick to build</h3>

        <input type="file" title="hi" />

        <input type="text" placeholder="Name: " />
        <input type="age" placeholder="Age: " />
        <input type="hometown" placeholder="Hometown: " />

        <textarea name="story" defaultValue="What's your story?" />

        <button>BUILD</button>
      </form>
    );
  }

});

export default ProfileForm;
