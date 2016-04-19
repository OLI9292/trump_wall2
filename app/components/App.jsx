import uuid from 'node-uuid';
import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

import Bricks from './Bricks.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bricks: [
        {
          id: uuid.v4(),
          data: {
            name: 'Oliver',
            age: '23',
            hometown: 'Connecticut',
            story: 'Just a regular dood.'
          }
        },
        {
          id: uuid.v4(),
          data: {
            name: 'Edrick',
            age: '23',
            hometown: 'Chicago',
            story: 'Just a regular dood.'
          }
        },
        {
          id: uuid.v4(),
          data: {
            name: 'Adam',
            age: '23',
            hometown: 'New York',
            story: 'Just a regular dood.'
          }
        }
      ]
    };
  }

  render() {

    const bricks = this.state.bricks;
    console.log(bricks)

    return (
      <div>
        <button onClick={this.addBrick}>Add to the wall by taking a selfie!</button>

        <Table
          rowsCount={this.state.bricks.length}
          rowHeight={50}
          headerHeight={50}
          width={1000}
          height={200}>

          <Column
            header={<Cell>Name</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.state.bricks[props.rowIndex].data.name}
              </Cell>
            )}
            width={200}
          />
        </Table>
      </div>
    );
  }

  addBrick = () => {
    this.setState({
      bricks: this.state.bricks.concat([{
        id: uuid.v4(),
        data: {
          name: 'Waka Flocka',
          age: '5',
          hometown: 'North Pole',
          story: 'Rooster in my Rari!'
        }
      }])
    });
  };
}
