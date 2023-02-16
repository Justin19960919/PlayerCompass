import React from 'react';
import { useParams } from 'react-router';

const Player = () => {
  //get player id
  const { id } = useParams();
  console.log(`player id is ${id}`);
  // fetch all player data upon page load, use useQuery
  return (
    <>
      <p>this is player details page</p>
    </>
  );
}

export default Player;


