import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PlayerProfile from './PlayerProfile';
import PlayerCareerBarChart from '../common/PlayerCareerBarChart';
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

  console.log(`player id is ${playerId}`);
  console.log(`player career data: `, playerCareerData);

  const {
    chartData,
    currentSeason: seasonData,
    // seasons,
  } = playerCareerData || {};

  return (
    <>
      {
        isLoading &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="5x"
          spin
          color="#cfdbd5"
          style={{ margin: "100px auto", width: "100%" }}
        />
      }
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
            // choose rand color

            return (
              <PlayerCareerBarChart
                metricType={metric}
                careerData={data}
              />
            );
          })
        }
      </div>
    </>
  );
}

export default Player;


