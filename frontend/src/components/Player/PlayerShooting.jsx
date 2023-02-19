import React from 'react';
import { fetchPlayerShooting } from '../../services/player';
import { useQuery } from '@tanstack/react-query';
import PlayerShootingAttemptPieChart from '../common/PlayerShootingAttemptPieChart';
import PlayerShootingMultiChart from '../common/PlayerShootingMultiChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// const data = {
//   "closest_defender_shooting": {
//     "barChart": [
//       {
//         "FG2A": 46,
//         "FG2A_FREQ": 0.062,
//         "FG2_PCT": 0.457,
//         "FG3A": 11,
//         "FG3A_FREQ": 0.015,
//         "FG3_PCT": 0.636,
//         "FGA_FREQ": 0.077,
//         "key": "0-2 Feet - Very Tight"
//       },
//       {
//         "FG2A": 157,
//         "FG2A_FREQ": 0.212,
//         "FG2_PCT": 0.643,
//         "FG3A": 74,
//         "FG3A_FREQ": 0.1,
//         "FG3_PCT": 0.27,
//         "FGA_FREQ": 0.313,
//         "key": "2-4 Feet - Tight"
//       },
//       {
//         "FG2A": 95,
//         "FG2A_FREQ": 0.129,
//         "FG2_PCT": 0.547,
//         "FG3A": 214,
//         "FG3A_FREQ": 0.29,
//         "FG3_PCT": 0.453,
//         "FGA_FREQ": 0.418,
//         "key": "4-6 Feet - Open"
//       },
//       {
//         "FG2A": 15,
//         "FG2A_FREQ": 0.02,
//         "FG2_PCT": 0.6,
//         "FG3A": 127,
//         "FG3A_FREQ": 0.172,
//         "FG3_PCT": 0.465,
//         "FGA_FREQ": 0.192,
//         "key": "6+ Feet - Wide Open"
//       }
//     ],
//     "pieChart": [
//       {
//         "name": "0-2 Feet - Very Tight - FG2A",
//         "value": 0.062
//       },
//       {
//         "name": "0-2 Feet - Very Tight - FG3A",
//         "value": 0.015
//       },
//       {
//         "name": "2-4 Feet - Tight - FG2A",
//         "value": 0.212
//       },
//       {
//         "name": "2-4 Feet - Tight - FG3A",
//         "value": 0.1
//       },
//       {
//         "name": "4-6 Feet - Open - FG2A",
//         "value": 0.129
//       },
//       {
//         "name": "4-6 Feet - Open - FG3A",
//         "value": 0.29
//       },
//       {
//         "name": "6+ Feet - Wide Open - FG2A",
//         "value": 0.02
//       },
//       {
//         "name": "6+ Feet - Wide Open - FG3A",
//         "value": 0.172
//       }
//     ]
//   },
//   "dribble_shooting": {
//     "barChart": [
//       {
//         "FG2A": 43,
//         "FG2A_FREQ": 0.058,
//         "FG2_PCT": 0.791,
//         "FG3A": 200,
//         "FG3A_FREQ": 0.271,
//         "FG3_PCT": 0.38,
//         "FGA_FREQ": 0.329,
//         "key": "0 Dribbles"
//       },
//       {
//         "FG2A": 34,
//         "FG2A_FREQ": 0.046,
//         "FG2_PCT": 0.647,
//         "FG3A": 47,
//         "FG3A_FREQ": 0.064,
//         "FG3_PCT": 0.553,
//         "FGA_FREQ": 0.11,
//         "key": "1 Dribble"
//       },
//       {
//         "FG2A": 37,
//         "FG2A_FREQ": 0.05,
//         "FG2_PCT": 0.541,
//         "FG3A": 23,
//         "FG3A_FREQ": 0.031,
//         "FG3_PCT": 0.565,
//         "FGA_FREQ": 0.081,
//         "key": "2 Dribbles"
//       },
//       {
//         "FG2A": 85,
//         "FG2A_FREQ": 0.115,
//         "FG2_PCT": 0.553,
//         "FG3A": 59,
//         "FG3A_FREQ": 0.08,
//         "FG3_PCT": 0.339,
//         "FGA_FREQ": 0.195,
//         "key": "3-6 Dribbles"
//       },
//       {
//         "FG2A": 114,
//         "FG2A_FREQ": 0.154,
//         "FG2_PCT": 0.526,
//         "FG3A": 97,
//         "FG3A_FREQ": 0.131,
//         "FG3_PCT": 0.495,
//         "FGA_FREQ": 0.286,
//         "key": "7+ Dribbles"
//       }
//     ],
//     "pieChart": [
//       {
//         "name": "0 Dribbles - FG2A",
//         "value": 0.058
//       },
//       {
//         "name": "0 Dribbles - FG3A",
//         "value": 0.271
//       },
//       {
//         "name": "1 Dribble - FG2A",
//         "value": 0.046
//       },
//       {
//         "name": "1 Dribble - FG3A",
//         "value": 0.064
//       },
//       {
//         "name": "2 Dribbles - FG2A",
//         "value": 0.05
//       },
//       {
//         "name": "2 Dribbles - FG3A",
//         "value": 0.031
//       },
//       {
//         "name": "3-6 Dribbles - FG2A",
//         "value": 0.115
//       },
//       {
//         "name": "3-6 Dribbles - FG3A",
//         "value": 0.08
//       },
//       {
//         "name": "7+ Dribbles - FG2A",
//         "value": 0.154
//       },
//       {
//         "name": "7+ Dribbles - FG3A",
//         "value": 0.131
//       }
//     ]
//   },
//   "general_shooting": {
//     "barChart": [
//       {
//         "FG2A": 7,
//         "FG2A_FREQ": 0.009,
//         "FG2_PCT": 0.571,
//         "FG3A": 194,
//         "FG3A_FREQ": 0.263,
//         "FG3_PCT": 0.392,
//         "FGA_FREQ": 0.272,
//         "key": "Catch and Shoot"
//       },
//       {
//         "FG2A": 107,
//         "FG2A_FREQ": 0.145,
//         "FG2_PCT": 0.43,
//         "FG3A": 226,
//         "FG3A_FREQ": 0.306,
//         "FG3_PCT": 0.473,
//         "FGA_FREQ": 0.451,
//         "key": "Pull Ups"
//       },
//       {
//         "FG2A": 198,
//         "FG2A_FREQ": 0.268,
//         "FG2_PCT": 0.672,
//         "FG3A": 0,
//         "FG3A_FREQ": 0.0,
//         "FG3_PCT": null,
//         "FGA_FREQ": 0.268,
//         "key": "Less than 10 ft"
//       },
//       {
//         "FG2A": 1,
//         "FG2A_FREQ": 0.001,
//         "FG2_PCT": 0.0,
//         "FG3A": 6,
//         "FG3A_FREQ": 0.008,
//         "FG3_PCT": 0.0,
//         "FGA_FREQ": 0.009,
//         "key": "Other"
//       }
//     ],
//     "pieChart": [
//       {
//         "name": "Catch and Shoot - FG2A",
//         "value": 0.009
//       },
//       {
//         "name": "Catch and Shoot - FG3A",
//         "value": 0.263
//       },
//       {
//         "name": "Pull Ups - FG2A",
//         "value": 0.145
//       },
//       {
//         "name": "Pull Ups - FG3A",
//         "value": 0.306
//       },
//       {
//         "name": "Less than 10 ft - FG2A",
//         "value": 0.268
//       },
//       {
//         "name": "Less than 10 ft - FG3A",
//         "value": 0.0
//       },
//       {
//         "name": "Other - FG2A",
//         "value": 0.001
//       },
//       {
//         "name": "Other - FG3A",
//         "value": 0.008
//       }
//     ]
//   },
//   "shot_clock_shooting": {
//     "barChart": [
//       {
//         "FG2A": 2,
//         "FG2A_FREQ": 0.003,
//         "FG2_PCT": 1.0,
//         "FG3A": 7,
//         "FG3A_FREQ": 0.009,
//         "FG3_PCT": 0.429,
//         "FGA_FREQ": 0.012,
//         "key": "24-22"
//       },
//       {
//         "FG2A": 47,
//         "FG2A_FREQ": 0.064,
//         "FG2_PCT": 0.702,
//         "FG3A": 83,
//         "FG3A_FREQ": 0.112,
//         "FG3_PCT": 0.386,
//         "FGA_FREQ": 0.176,
//         "key": "22-18 Very Early"
//       },
//       {
//         "FG2A": 89,
//         "FG2A_FREQ": 0.12,
//         "FG2_PCT": 0.629,
//         "FG3A": 106,
//         "FG3A_FREQ": 0.143,
//         "FG3_PCT": 0.443,
//         "FGA_FREQ": 0.264,
//         "key": "18-15 Early"
//       },
//       {
//         "FG2A": 142,
//         "FG2A_FREQ": 0.192,
//         "FG2_PCT": 0.556,
//         "FG3A": 177,
//         "FG3A_FREQ": 0.24,
//         "FG3_PCT": 0.475,
//         "FGA_FREQ": 0.432,
//         "key": "15-7 Average"
//       },
//       {
//         "FG2A": 22,
//         "FG2A_FREQ": 0.03,
//         "FG2_PCT": 0.409,
//         "FG3A": 26,
//         "FG3A_FREQ": 0.035,
//         "FG3_PCT": 0.385,
//         "FGA_FREQ": 0.065,
//         "key": "7-4 Late"
//       },
//       {
//         "FG2A": 11,
//         "FG2A_FREQ": 0.015,
//         "FG2_PCT": 0.364,
//         "FG3A": 27,
//         "FG3A_FREQ": 0.037,
//         "FG3_PCT": 0.259,
//         "FGA_FREQ": 0.051,
//         "key": "4-0 Very Late"
//       }
//     ],
//     "pieChart": [
//       {
//         "name": "24-22 - FG2A",
//         "value": 0.003
//       },
//       {
//         "name": "24-22 - FG3A",
//         "value": 0.009
//       },
//       {
//         "name": "22-18 Very Early - FG2A",
//         "value": 0.064
//       },
//       {
//         "name": "22-18 Very Early - FG3A",
//         "value": 0.112
//       },
//       {
//         "name": "18-15 Early - FG2A",
//         "value": 0.12
//       },
//       {
//         "name": "18-15 Early - FG3A",
//         "value": 0.143
//       },
//       {
//         "name": "15-7 Average - FG2A",
//         "value": 0.192
//       },
//       {
//         "name": "15-7 Average - FG3A",
//         "value": 0.24
//       },
//       {
//         "name": "7-4 Late - FG2A",
//         "value": 0.03
//       },
//       {
//         "name": "7-4 Late - FG3A",
//         "value": 0.035
//       },
//       {
//         "name": "4-0 Very Late - FG2A",
//         "value": 0.015
//       },
//       {
//         "name": "4-0 Very Late - FG3A",
//         "value": 0.037
//       }
//     ]
//   },
//   "touch_time_shooting": {
//     "barChart": [
//       {
//         "FG2A": 71,
//         "FG2A_FREQ": 0.096,
//         "FG2_PCT": 0.718,
//         "FG3A": 229,
//         "FG3A_FREQ": 0.31,
//         "FG3_PCT": 0.415,
//         "FGA_FREQ": 0.406,
//         "key": "Touch < 2 Seconds"
//       },
//       {
//         "FG2A": 123,
//         "FG2A_FREQ": 0.166,
//         "FG2_PCT": 0.545,
//         "FG3A": 101,
//         "FG3A_FREQ": 0.137,
//         "FG3_PCT": 0.386,
//         "FGA_FREQ": 0.303,
//         "key": "Touch 2-6 Seconds"
//       },
//       {
//         "FG2A": 119,
//         "FG2A_FREQ": 0.161,
//         "FG2_PCT": 0.546,
//         "FG3A": 96,
//         "FG3A_FREQ": 0.13,
//         "FG3_PCT": 0.51,
//         "FGA_FREQ": 0.291,
//         "key": "Touch 6+ Seconds"
//       }
//     ],
//     "pieChart": [
//       {
//         "name": "Touch < 2 Seconds - FG2A",
//         "value": 0.096
//       },
//       {
//         "name": "Touch < 2 Seconds - FG3A",
//         "value": 0.31
//       },
//       {
//         "name": "Touch 2-6 Seconds - FG2A",
//         "value": 0.166
//       },
//       {
//         "name": "Touch 2-6 Seconds - FG3A",
//         "value": 0.137
//       },
//       {
//         "name": "Touch 6+ Seconds - FG2A",
//         "value": 0.161
//       },
//       {
//         "name": "Touch 6+ Seconds - FG3A",
//         "value": 0.13
//       }
//     ]
//   }
// }

const DISPLAY_SHOOTING_ORDER = [
  "general_shooting",
  "dribble_shooting",
  "touch_time_shooting",
  "shot_clock_shooting",
  "closest_defender_shooting",
];

const PlayerShooting = ({ playerId }) => {
  const teamId = JSON.parse(localStorage.getItem('rosterData'))['teamId'];

  // fetch all player data upon page load, use useQuery
  const { data: playerShootingData, isLoading, isError } = useQuery(
    ['playerShooting', playerId],
    () => fetchPlayerShooting({
      playerId: 201939,
      teamId: 1610612744,
    }),
  );
  console.log(`player shootingData`, playerShootingData);
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