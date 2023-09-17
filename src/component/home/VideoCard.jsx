import React, { Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { AdsClick, CheckCircle } from "@mui/icons-material";
import { VideoState } from "../../context/VideoProvider";

function VideoCard({ item }) {
  const { darkMode } = VideoState();
  return (
    <Fragment>
      {item?.id?.videoId ? (
        <Link
          to={`/video/${item?.id?.videoId}`}
          key={item?.snippet?.channelId}
          className={`videoCard ${darkMode ? "darkMode" : ""}`}
        >
          <div className="imageBox">
            <img src={item?.snippet?.thumbnails?.high?.url} alt="thumbnails" />
          </div>
          <div className="videoText">
            <p>{item?.snippet?.title.slice(0, 60)}</p>
            <div className="channelName">
              {item?.snippet?.channelTitle}
              <CheckCircle />
            </div>
          </div>
        </Link>
      ) : item?.id?.channelId ? (
        <Link
          to={`/channel/${item?.id?.channelId}`}
          key={item?.snippet?.channelId}
          className={`channelCard ${darkMode ? "darkMode" : ""}`}
        >
          <div className="channelImageBox">
            <img src={item?.snippet?.thumbnails?.high?.url} alt="thumbnails" />
          </div>
          <div className="channelText">
            {" "}
            {item?.snippet?.channelTitle}
            <CheckCircle />
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
            }}
          >
            Watch channel videos{" "}
            <AdsClick style={{ fontSize: "1rem", margin: "5px" }} />
          </span>
        </Link>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default VideoCard;
