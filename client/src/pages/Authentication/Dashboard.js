import * as React from "react";
import { Grid } from "@mui/material";
import { useGetUserDataQuery } from "../../store/services/dashboardServices";
import BarCharts from "../../Components/Charts/BarChart";
import LineCharts from "../../Components/Charts/LineChart";
import PieChart from "../../Components/Charts/PieChart";
export default function Dashboard() {
  const { data: userData } = useGetUserDataQuery();
   
  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: "10px" }}>
        <Grid item xs={12} md={4}>
          <BarCharts data={userData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LineCharts data={userData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChart data={userData} />
        </Grid>
      </Grid>
    </>
  );
}
