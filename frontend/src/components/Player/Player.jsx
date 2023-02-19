import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../common/Spinner';
import PlayerProfile from './PlayerProfile';
import PlayerCareerBarChart from '../common/PlayerCareerBarChart';
import PlayerShooting from './PlayerShooting'
import PlayerPassing from './PlayerPassing';
// utils
import { fetchPlayerCareerData } from '../../services/player';
import { fetchPlayerName } from '../../services/player';

const Player = () => {

  // get player id
  const { id: playerId } = useParams();

  // fetch all player data upon page load, use useQuery
  const { data: playerCareerData, isLoading, isError } = useQuery(
    ['playerCareerData', playerId],
    () => fetchPlayerCareerData({
      playerId,
      perMode: 'PerGame', // TODO: can do button to switch to Per36
    }),
  );
  const { data: playerName } = useQuery(['playerName', playerId], () => fetchPlayerName({ playerId }));

  const {
    chartData,
    currentSeason: seasonData,
    // seasons,
  } = playerCareerData || {};

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
      {
        !isLoading && !chartData && <h1 style={{ textAlign: "center" }}>
          There is no data for this player.
        </h1>
      }
      {
        seasonData && <PlayerProfile seasonData={seasonData} playerName={playerName} />
      }
      <div className="flex-container">
        {
          playerCareerData && chartData && Object.entries(chartData).map(([metric, data]) => {
            return (
              <PlayerCareerBarChart
                metricType={metric}
                careerData={data}
              />
            );
          })
        }
      </div>
      <PlayerShooting playerId={playerId} />
      <PlayerPassing playerId={playerId} />
    </>
  );
}

export default Player;


