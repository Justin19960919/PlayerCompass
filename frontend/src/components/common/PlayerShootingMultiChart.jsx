import React from 'react';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';


const PlayerShootingMultiChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
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
        <XAxis dataKey="key" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="FG2A" stackId="a" fill="#28afb0" barSize={20} />
        <Bar yAxisId="left" dataKey="FG3A" stackId="a" fill="#475b63" barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="FG2_PCT" stroke="#28afb0" />
        <Line yAxisId="right" type="monotone" dataKey="FG3_PCT" stroke="#475b63" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default PlayerShootingMultiChart;