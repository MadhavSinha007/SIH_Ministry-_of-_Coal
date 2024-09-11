import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import BarChart from "../components/Barchart";
import { PieChart } from "../components/PieChart";
import { LineChart } from "../components/LineChart";

const absentData = [
  { name: "Off Duty", value: 16 },
  { name: "Injured", value: 9 },
  { name: "On Duty", value: 68 },
];

const scoreData = [
  { name: "Off Duty", value: 18 },
  { name: "Injured", value: 8 },
  { name: "On Duty", value: 72 },
];

const acquisitionData = [
  { Day: 1, TargetInKg: 10000 },
  { Day: 2, TargetInKg: 15000 },
  { Day: 3, TargetInKg: 20000 },
  { Day: 4, TargetInKg: 30000 },
  { Day: 5, TargetInKg: 25000 },
  { Day: 6, TargetInKg: 35000 },
  { Day: 7, TargetInKg: 40000 },
];

const ctScoreData = [
  { month: "Jan", CoalAcquired: 160 },
  { month: "Feb", CoalAcquired: 120 },
  { month: "Mar", CoalAcquired: 120 },
  { month: "Apr", CoalAcquired: 180 },
  { month: "May", CoalAcquired: 100 },
  { month: "Jun", CoalAcquired: 120 },
  { month: "Jul", CoalAcquired: 140 },
  { month: "Aug", CoalAcquired: 130 },
  { month: "Sep", CoalAcquired: 170 },
  { month: "Oct", CoalAcquired: 180 },
  { month: "Nov", CoalAcquired: 90 },
  { month: "Dec", CoalAcquired: 110 },
];

const StudentOperations = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        padding: 2,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#fff' }}>
        Student Operations
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <PieChart title="In Mine Shift Detail" data={absentData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <PieChart title="Previous Shift Detail" data={scoreData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <LineChart title="Target In KiloGram" data={acquisitionData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <BarChart title="Monthly Acquisition of Coal" data={ctScoreData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentOperations;
