import React from "react";
import ShiftLogHistory from "./ShiftLogPDF";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const GlassBackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // glass background color
  backdropFilter: "blur(10px)", // blur effect
  borderRadius: "10px", // rounded corners
  padding: "20px", // padding
  width: "80%", // width
  margin: "40px auto", // center horizontally
}));

const History = () => {
  return (
    <GlassBackgroundContainer>
      <h1>Previous Shifts</h1>
      <ShiftLogHistory />
    </GlassBackgroundContainer>
  );
};

export default History;