import React from 'react';
import { styled } from "@mui/material/styles";
import MineSafetyCheck from "../components/MineSafetyCheck";

const GlassBackgroundContainer = styled('div')(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // glass background color
  backdropFilter: "blur(10px)", // blur effect
  borderRadius: "10px", // rounded corners
  padding: "20px", // padding
  width: "80%", // width
  margin: "40px auto", // center horizontally
}));

const Safety = () => {
  return (
    <GlassBackgroundContainer>
      <h1>Safety Measure </h1>
      <MineSafetyCheck />
    </GlassBackgroundContainer>
  );
};

export default Safety;