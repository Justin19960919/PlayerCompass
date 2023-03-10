import React from 'react'
import { Link } from 'react-router-dom';
import "./index.css";

const Position = ({ position, players }) => {
  return (
    <div className="position">
      <h3>Position: {position}</h3>
      {
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Age</th>
              <th scope="col">Experience</th>
              <th scope="col">Height</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => {
              const link = '/player/' + player['PLAYER_ID'];
              return (
                <tr>
                  <td>
                    <Link to={link} style={{ color: "#00b4d8", textDecoration: "none" }}>
                      {player['PLAYER']}
                    </Link>
                  </td>
                  <td>{player['NUM']}</td>
                  <td>{player['AGE']}</td>
                  <td>{player['EXP'] === "R" ? "Rookie" : player['EXP'] + 'y'}</td>
                  <td>{player['HEIGHT']} ft</td>
                  <td>{player['WEIGHT']} lbs</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </div>
  );
}

const Positions = ({ roster }) => {
  const positions = {}
  if (roster) {
    roster.forEach(player => {
      const playerPosition = player['POSITION'];
      if (playerPosition in positions) {
        positions[playerPosition].push(player)
      } else {
        positions[playerPosition] = [player];
      }
    })
  }
  return (
    <div>
      {
        Object.entries(positions).map(([position, players]) =>
          <Position position={position} players={players} />
        )
      }
    </div>
  );
}



export default Positions;