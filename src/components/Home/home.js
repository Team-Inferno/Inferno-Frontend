import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div>
        <p>HomePage</p>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link> 
      </div>
    );
}


export default Home;