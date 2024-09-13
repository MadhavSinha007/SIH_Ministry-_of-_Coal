import React from 'react';
import { styled } from "@mui/material/styles";
import MineSafetyCheck from "../components/MineSafetyCheck";
import PostForm from "../components/PostForm";

const GlassBackgroundContainer = styled('div')(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // glass background color
  backdropFilter: "blur(10px)", // blur effect
  borderRadius: "10px", // rounded corners
  padding: "20px", // padding
  width: "80%", // width
  margin: "40px auto", 
}));

const Safety = () => {
  return (
    <GlassBackgroundContainer>
      <h1>Enter your Shift Details</h1>
      <PostForm />
    </GlassBackgroundContainer>
  );
};

export default Safety;