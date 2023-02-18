import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const PlayerCareerBarChart = ({
  metricType,
  careerData,
}) => {
  return (
    <div style={{ margin: "15px 5px" }}>
      <p style={{
        fontSize: "20px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "0px",
        color: "#4e4f50",
      }}
      >
        {metricType}
      </p>
      <BarChart
        width={500}
        height={350}
        data={careerData}
      >
        <Label value="Pages of my website" offset={0} position="top" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="season"
          tickMargin={12}
          interval={0}
        />
        <YAxis
          tickCount={5}
        />
        <Tooltip />
        <Legend
          verticalAlign="top"
          iconSize={10}
        />
        <Bar dataKey="regular" fill="#95b2b8" />
        <Bar dataKey="playoffs" fill="#efc88b" />
      </BarChart>
    </div>
  );
}

export default PlayerCareerBarChart;