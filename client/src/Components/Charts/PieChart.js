import React from "react";
import { Card, CardHeader, Divider } from "@mui/material";
import {
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts";
import { useGetUserDataQuery } from "../../store/services/dashboardServices";

const PieChart = () => {
  const { data: userData } = useGetUserDataQuery();

  if (!userData) {
    return null;
  }

  const colors = ["#FF5733", "#581845", "#FFC300", "#DAF7A6", "#C70039"];

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
        <CardHeader title="Number of users Registered" />
        <Divider style={{ backgroundColor: "grey" }} />
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={userData}
              dataKey="count"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />

        <Legend/>
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default PieChart;
