import React from "react";
import "../../App.css";
import logo from "../../images/youtube-logo.jpg";
import {
  Search,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { VideoState } from "../../context/VideoProvider";
import { baseUrl, fetchVideo } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const {
    darkMode,
    setDarkMode,
    setVideos,
    setPageToken,
    searchText,
    setSearchText,
  } = VideoState();

  const url = `${baseUrl}/search?q=${searchText}&part=snippet%2Cid&maxResults=30`;

  //handle search .............
  const handleSubmit = (e) => {
    navigate("/");
    e.preventDefault();
    if (searchText) {
      fetchVideo(url).then((data) => {
        setPageToken(data.nextPageToken);
        setVideos(data.items);
      });
    }
  };
  const HandleColorChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`Navbar ${darkMode ? "darkMode" : ""}`}
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: darkMode ? "rgb(34, 34, 34)" : "white",
      }}
    >
      <div className="mainLogo" onClick={() => navigate("/")}>
        <img src={logo} alt="" />
      </div>
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          className={`mainSearchInput ${darkMode && "darkMode"}`}
          style={{
            color: darkMode ? "white" : "black",
          }}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">
          <Search />
        </button>
      </form>
      <div className="nightMode">
        <button onClick={HandleColorChange}>
          {darkMode ? (
            <LightModeOutlined style={{ color: "white" }} />
          ) : (
            <DarkModeOutlined />
          )}
        </button>
      </div>
    </div>
    // <div className="Navigation" style={{ position: "sticky", top: "0" }}>
    //   navbar
    // </div>
  );
}

export default Navbar;
