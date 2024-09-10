import React from 'react';
import { styled } from "@mui/material/styles";
import LogEntryForm from '../components/LogEntryForm';

const GlassBackgroundContainer = styled('div')(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // glass background color
  backdropFilter: "blur(10px)", // blur effect
  borderRadius: "10px", // rounded corners
  padding: "20px", // padding
  width: "80%", // width
  margin: "40px auto", // center horizontally
}));

const ShiftPage = () => {
  return (
    <GlassBackgroundContainer>
      <h1>Enter your Shift Details</h1>
      <LogEntryForm />
    </GlassBackgroundContainer>
  );
};

export default ShiftPage;