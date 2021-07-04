import React from "react";
import "./css/home.css";
import LeftSidebar from "./Sidebar/LeftSidebar/sidebar.left";

import Chat from "./Chat/chat";

const Home = () => {
  return (
    <div id="home">
      <LeftSidebar />
      <Chat />
    </div>
  );
};

export default Home;
