import React from 'react';
import { fetchPlayerShooting } from '../../services/player';
import { useQuery } from '@tanstack/react-query';
import PlayerShootingAttemptPieChart from '../common/PlayerShootingAttemptPieChart';
import PlayerShootingMultiChart from '../common/PlayerShootingMultiChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTeamContext } from '../../components/useTeamContext';
import Spinner from '../common/Spinner';

const DISPLAY_SHOOTING_ORDER = [
  "general_shooting",
  "dribble_shooting",
  "touch_time_shooting",
  "shot_clock_shooting",
  "closest_defender_shooting",
];

const PlayerShooting = ({ playerId }) => {
  const { teamData } = useTeamContext();
  // const teamId = JSON.parse(localStorage.getItem('rosterData'))['teamId'];

  // fetch all player data upon page load, use useQuery
  const { data: playerShootingData, isLoading, isError } = useQuery(
    ['playerShooting', playerId],
    () => fetchPlayerShooting({
      playerId: playerId,
      teamId: teamData?.teamId,
    }),
  );

  return (
    <>
      {/* {
        isLoading &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="5x"
          spin
          color="#cfdbd5"
          style={{ margin: "100px auto", width: "100%" }}
        />
      } */}
      <Spinner isLoading={isLoading} />
      {
        isError && <h1 style={{ textAlign: "center" }}>
          We have encountered an error.
        </h1>
      }

      {playerShootingData && DISPLAY_SHOOTING_ORDER.map(type => (
        <>
          <PlayerShootingMultiChart data={playerShootingData[type]['barChart']} />
          <PlayerShootingAttemptPieChart data={playerShootingData[type]['pieChart']} />
        </>
      ))}

    </>
  );
}

export default PlayerShooting;