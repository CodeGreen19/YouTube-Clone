import React, { useEffect, useState } from "react";
import { baseUrl, fetchVideo } from "../../utils/fetchData";
import { VideoState } from "../../context/VideoProvider";
import { Link } from "react-router-dom";

function ChannelDetail({ videoId, channelId }) {
  const { darkMode } = VideoState();
  const [detailData, setDetailData] = useState();
  const [profileDetail, setProfileDetail] = useState("");

  const url = `${baseUrl}/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`;
  const chanelUrl = `${baseUrl}/channels?part=snippet%2Cstatistics&id=${channelId}`;

  // to format all counts
  function formatCounts(subscribers) {
    if (subscribers >= 1000000) {
      return (subscribers / 1000000).toFixed(1) + "M";
    } else if (subscribers >= 1000) {
      return (subscribers / 1000).toFixed(1) + "K";
    } else {
      return subscribers;
    }
  }

  useEffect(() => {
    fetchVideo(url).then((data) => {
      setDetailData(data.items[0]);
    });
    //eslint-disable-next-line
  }, [videoId]);

  useEffect(() => {
    if (channelId) {
      fetchVideo(chanelUrl).then((data) => {
        setProfileDetail(data.items[0]);
      });
    }
    //eslint-disable-next-line
  }, [channelId]);

  return (
    <div className={`videoDetailBox ${darkMode && "darkMode"}`}>
      <p>{detailData?.snippet?.title.slice(0, 30)}....</p>
      <div className="details">
        <Link className="profileImg" to={`/channel/${profileDetail?.id}`}>
          {profileDetail && (
            <img
              src={profileDetail?.snippet?.thumbnails?.high?.url}
              alt="profileImage"
            />
          )}
        </Link>
        <span>{detailData?.snippet?.channelTitle}</span>
        <button>
          {formatCounts(profileDetail?.statistics?.subscriberCount)} subscribers
        </button>
        <button>{formatCounts(detailData?.statistics?.viewCount)} views</button>
        <button>{formatCounts(detailData?.statistics?.likeCount)} likes</button>
        <button>
          {formatCounts(detailData?.statistics?.commentCount)} comments
        </button>
      </div>
    </div>
  );
}

export default ChannelDetail;
