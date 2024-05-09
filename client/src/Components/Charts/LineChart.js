import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Divider } from '@mui/material';
import { XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer,  LineChart } from 'recharts';
import { useGetUserDataQuery } from '../../store/services/dashboardServices';

const LineCharts = () => {
  const { data: userData } = useGetUserDataQuery();

  
  const renderTooltip = (data) => {
    if (!data || !data.payload || data.payload.length === 0) {
      return null;
    }

    const { payload } = data;
    const firstItem = payload[0];

    return (
      <div
        style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}
      >
        <p>{`Date: ${firstItem.payload.date}`}</p>
        <p>{`Total number of users: ${firstItem.payload.count}`}</p>
      </div>
    );
  };


  return (
    <div>
     
    <Card sx={{ marginTop: "20px", marginLeft: "30px", maxWidth: 345 }}>
      <CardHeader
        title="Number of users Registered"
      />
      <Divider style={{ backgroundColor: 'grey' }}/>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userData}>
          <XAxis dataKey="date" />
          <YAxis />
        <Tooltip content={renderTooltip} />

        <Legend/>
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
    </div>
  )
}

export default LineCharts


