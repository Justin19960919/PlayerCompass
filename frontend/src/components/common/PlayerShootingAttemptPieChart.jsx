import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';

const COLORS = ['#d9ed92', '#b5e48c', '#99d98c', '#76c893', "#52b69a", "#34a0a4", "#168aad", "#1a759f", "#1e6091", "#184e77"];
const RADIAN = Math.PI / 180;

const PlayerShootingAttemptPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine
          label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
            const radius = outerRadius + 25;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill="#415a77" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
              </text>
            );
          }}
          innerRadius={80}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PlayerShootingAttemptPieChart;