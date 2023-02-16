import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Positions from './Positions';
import InfoContainer from '../Info';
// AGE:22
// EXP:"R"
// HEIGHT:"6-5"
// NUM:"0"
// PLAYER:"Dereon Seabron"
// PLAYER_ID:1631220
// POSITION:"G"
// WEIGHT:"180" 
const TeamRoster = ({
  teamId,
  teamRosterRef,
  isLoading,
  isError,
  roster,
}) => {
  console.log(`team roster level: `, roster);
  return (
    <div ref={teamRosterRef}>
      {teamId && isLoading &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="3x"
          spin
          color="#14213d"
          style={{ margin: "5px auto", width: "100%" }}
        />}
      {isError && <InfoContainer isError info="Sorry, we have ecountered an error." />}
      {
        roster &&
        <Positions roster={roster} />
      }
    </div>
  );
}

export default TeamRoster;