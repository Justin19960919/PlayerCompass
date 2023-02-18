import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Positions from './Positions';
import InfoContainer from '../Info';

const TeamRoster = ({
  teamId,
  teamRosterRef,
  isLoading,
  isError,
  roster,
}) => {
  console.log(`team roster level: `, roster);
  // TODO: show team name as well
  return (
    <div ref={teamRosterRef}>
      {/* TODO: is loading icon has bug */}
      {!teamId && isLoading &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="3x"
          spin
          color="#cfdbd5"
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