import React from "react";
import Navbar from "./Navbar";
import "./HomePage.css";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { VideoState } from "../../context/VideoProvider";

function HomePage() {
  const { darkMode } = VideoState();
  return (
    <div className="home" style={darkMode ? { backgroundColor: "black" } : {}}>
      <Navbar />
      <div className="sideOrVideoContainer">
        <SideBar />
        <Videos />
      </div>
    </div>
  );
}

export default HomePage;
