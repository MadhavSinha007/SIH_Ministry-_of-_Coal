import React from "react";
import HistoryComp from "./HistoryComp";
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
      <h1>Shift Logs</h1>
      <HistoryComp />
    </GlassBackgroundContainer>
  );
};

export default History;