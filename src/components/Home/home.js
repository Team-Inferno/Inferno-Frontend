import React from "react";
import "./css/home.css";
import Sidebar from "./Sidebar/sidebar"
import Chat from "./Chat/chat"
const Home = () => {
  return (
    <div className="home">  
      <Sidebar/>
      <Chat/>
    </div>
  );
};

export default Home;
