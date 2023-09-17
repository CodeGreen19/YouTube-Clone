import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import "./VideoPlay.css";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { baseUrl, fetchVideo } from "../../utils/fetchData";
import { VideoState } from "../../context/VideoProvider";
import VideoCard from "../home/VideoCard";
import ChannelDetail from "./ChannelDetail";

function VideoDetail() {
  const { id } = useParams();
  const { searchText, darkMode } = VideoState();
  const [suggestedVideos, setSuggestedVideos] = useState();
  const [channelId, setChannelId] = useState();
  const url = `${baseUrl}/search?q=${searchText}&part=snippet%2Cid&maxResults=20&relatedToVideoId=${id}&type=video`;
  const channelUrl = `${baseUrl}/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`;

  // to fetch suggested video and stored in a state
  useEffect(() => {
    fetchVideo(url).then((data) => {
      setSuggestedVideos(data.items);
    });
    //eslint-disable-next-line
  }, [id]);

  // to fetch channel id and store in a state
  useEffect(() => {
    fetchVideo(channelUrl).then((data) => {
      setChannelId(data.items[0].snippet?.channelId);
    });
    //eslint-disable-next-line
  }, [id]);
  return (
    <Fragment>
      <Navbar />
      <div className={`VideoDetailContainer ${darkMode && "darkMode"}`}>
        <div className={`playVideoBox`}>
          <div className="mainVideo">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <ChannelDetail videoId={id} channelId={channelId} />
        </div>
        <div className="suggestedVideosBox">
          {suggestedVideos &&
            suggestedVideos.map((video) => <VideoCard item={video} />)}
          <span style={{ fontSize: "0.8rem", margin: "5px" }}>
            No More suggested videos
          </span>
        </div>
      </div>
    </Fragment>
  );
}

export default VideoDetail;
