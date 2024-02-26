import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import React from "react";
import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";


const Index = () => {
  
  return (
    <Box>
      <Navbar />
      <Landing />
      <Footer />
    </Box>
  );
};

export default Index;
