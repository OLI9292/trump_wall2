import React from 'react';
import '../main.css';
import uuid from 'node-uuid';
import _ from 'underscore';

export default class Bricks extends React.Component {

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
    if (rowCount !== rowNo) {
      this.reveal(rowNo);
    } else {
      this.build();
    }
  }

  mouseEnter(count) {
    console.log(this.props.totalCount);
    let newProfilesState = this.state.profiles;
    newProfilesState[newProfilesState.length - 1] = {name: '#' + count};
    this.setState({profiles: newProfilesState});
    this.setState({showBrickCount: true});
  }
  mouseLeave() {
    let newProfilesState = this.state.profiles;
    newProfilesState[newProfilesState.length - 1] = 1;
    this.setState({profiles: newProfilesState});
    this.setState({showBrickCount: false});
  }
//{this.state.profiles.length === 1 ? "" : this.state.profiles[this.state.profiles.length-index-1].name}
  render() {

    let bricks = this.state.profiles.map((brick, index) => {
      return (
        <tr key={uuid.v4()}>
          <td onClick={this.brickClicked.bind(this, this.state.count, this.state.profiles.length-index)} 
            onMouseEnter={this.mouseEnter.bind(this, this.props.totalCount)} onMouseLeave={this.mouseLeave.bind(this)}
            style={index === 0 ? style.styleNotBuilt : style.styleBuilt} >     
            { this.state.showBrickCount ? this.state.profiles[this.state.profiles.length-index-1].name : 
              this.state.profiles.length === 1 ? "" : this.state.profiles[this.state.profiles.length-index-1].name }
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
    border: '1px solid black',
    background: '#ccc'
  },
  styleNotBuilt: {
    border: '1px solid #ffd700',
    background: 'rgba(255,255,255,0.3)'
  }
}
