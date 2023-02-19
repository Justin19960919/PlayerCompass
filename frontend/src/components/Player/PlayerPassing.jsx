import React from 'react';
import { useTeamContext } from '../../components/useTeamContext';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchPlayerPassing } from '../../services/player';
import Spinner from '../common/Spinner';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';

const PassingChart = ({ data, header }) => {
  return (
    <div style={{ marginBottom: "100px" }}>
      <h5 style={{ textAlign: "center" }}>{header}</h5>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="player" interval={0} angle={40} tickMargin={5} height={60} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar yAxisId="left" dataKey="pass" fill="#28afb0" barSize={10} />
          <Line yAxisId="right" type="monotone" dataKey="fgPct" stroke="#475b63" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

const PlayerPassing = ({ playerId }) => {
  const { teamData } = useTeamContext();

  // fetch all player data upon page load, use useQuery
  const { data: passingData, isLoading, isError } = useQuery(
    ['passing', playerId],
    () => fetchPlayerPassing({
      playerId: playerId,
      teamId: teamData?.teamId,
    }),
  );

  return (
    <>
      <Spinner isLoading={isLoading} />
      {passingData && <PassingChart data={passingData['made']} header="Passes Made" />}
      {passingData && <PassingChart data={passingData['received']} header="Passes Received" />}
    </>
  );
}

export default PlayerPassing;