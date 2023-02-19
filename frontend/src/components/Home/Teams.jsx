import React from 'react';
import { NBA_TEAMS } from '../../constant';
import InfoContainer from '../Info';
import './index.css';

const Teams = ({ handleClick }) => {
  return (
    <div>
      {/* TODO: i wanna change this, kinda ugly. */}
      {/* <InfoContainer info={welcomeMessage} /> */}
      <div className='d-flex p-3 flex-row flex-wrap justify-content-center'>
        {
          Object.entries(NBA_TEAMS).map(([teamName, id]) => {
            const nbaTeam = teamName.toLowerCase().replaceAll(" ", "-");
            const imgSrc = "/nba_teams/nba-" + nbaTeam + ".png";
            return (
              <div onClick={event => handleClick(event, id)} key={id} className="card-outer">
                <img alt={teamName} src={imgSrc} width="200" height="200" className="card-inner"
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};





export default Teams;