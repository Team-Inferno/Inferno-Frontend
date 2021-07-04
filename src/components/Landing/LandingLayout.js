import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";

export default function LandingLayout({ children }) {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Navbar />
      {children}
      <Footer />
    </Flex>
  );
}
