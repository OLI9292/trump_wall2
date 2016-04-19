import React from 'react';
import Brick from './Brick.jsx'

export default ({bricks}) => {
  return (
    <ul>{bricks.map(brick =>
      <li key={brick.id}>
        <Brick name={brick.data.name} />
      </li>
    )}</ul>
  );
}
