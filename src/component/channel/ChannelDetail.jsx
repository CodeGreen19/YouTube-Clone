import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import "./ChannelDetail.css";
import { baseUrl, fetchVideo } from "../../utils/fetchData";
import { useParams } from "react-router-dom";
import VideoCard from "../home/VideoCard";
import { VideoState } from "../../context/VideoProvider";

function ChannelDetail() {
  const { channelId } = useParams();
  const { darkMode } = VideoState();
  const [channelVideos, setChannelVideos] = useState();
  const [nextPage, setNextPage] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [profileInfo, setProfileInfo] = useState("");
  const url = `${baseUrl}/search?part=snippet%2Cid&maxResults=30&order=date&channelId=${channelId}`;
  const nextUrl = `${baseUrl}/search?part=snippet%2Cid&maxResults=30&order=date&channelId=${channelId}&pageToken=${nextPage}`;
  const profileUrl = `${baseUrl}/channels?part=snippet%2Cstatistics&id=${channelId}`;

  // to format count
  function formatCounts(subscribers) {
    if (subscribers >= 1000000) {
      return (subscribers / 1000000).toFixed(1) + "M";
    } else if (subscribers >= 1000) {
      return (subscribers / 1000).toFixed(1) + "K";
    } else {
      return subscribers;
    }
  }

  const handleSeeMore = () => {
    fetchVideo(nextUrl).then((data) => {
      setNextPage(data.nextPageToken);
      const newVideo = data.items;
      setChannelVideos((oldVideo) => [...oldVideo, ...newVideo]);
    });
  };
  useEffect(() => {
    fetchVideo(url).then((data) => {
      setPageInfo(data.pageInfo);

      setNextPage(data.nextPageToken);
      setChannelVideos(data.items);
    });
    //eslint-disable-next-line
  }, [url]);
  useEffect(() => {
    fetchVideo(profileUrl).then((data) => {
      setProfileInfo(data.items[0]);
    });
    //eslint-disable-next-line
  }, [profileUrl]);

  return (
    <Fragment>
      <Navbar />
      <div className={`channeProfilelInfo ${darkMode && "darkMode"}`}>
        <div className="profileImg">
          {profileInfo && (
            <img
              src={profileInfo?.snippet?.thumbnails?.high?.url}
              alt="profile"
            />
          )}
        </div>
        <p>{profileInfo.snippet?.title}</p>
        <div>
          <button>
            {formatCounts(profileInfo.statistics?.videoCount)} videos
          </button>
          <button>
            {formatCounts(profileInfo.statistics?.subscriberCount)} subscribers
          </button>
        </div>
      </div>
      <div className={`chnnelVideos ${darkMode && "darkMode"}`}>
        {channelVideos &&
          channelVideos.map((item) => <VideoCard item={item} />)}
      </div>
      <div
        style={{
          width: "99vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {pageInfo && pageInfo.totalResults - channelVideos.length > 30 ? (
          <button className="seeMore" onClick={handleSeeMore}>
            See More
          </button>
        ) : (
          <div>No More Videos......</div>
        )}
      </div>
    </Fragment>
  );
}

export default ChannelDetail;
