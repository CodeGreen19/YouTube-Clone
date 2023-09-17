import React, { useEffect } from "react";
import { baseUrl, fetchVideo } from "../../utils/fetchData";
import VideoCard from "./VideoCard";
import "./HomePage.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { VideoState } from "../../context/VideoProvider";

function Videos() {
  const { videos, setVideos, pageToken, setPageToken, searchText } =
    VideoState();
  const initialText = "most beautiful places";
  const url = searchText
    ? `${baseUrl}/search?q=${searchText}&part=snippet%2Cid&maxResults=30&pageToken=${pageToken}`
    : `${baseUrl}/search?q=${initialText}&part=snippet%2Cid&maxResults=30&pageToken=${pageToken}`;
  const initailUrl = searchText
    ? `${baseUrl}/search?q=${searchText}&part=snippet%2Cid&maxResults=30`
    : `${baseUrl}/search?q=${initialText}&part=snippet%2Cid&maxResults=30`;
  const fetchData = () => {
    fetchVideo(url).then((data) => {
      setPageToken(data.nextPageToken);
      let newData = data.items;
      setVideos((oldData) => [...oldData, ...newData]);
    });
  };
  useEffect(() => {
    fetchVideo(initailUrl).then((data) => {
      console.log(data);
      setPageToken(data.nextPageToken);
      setVideos(data.items);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <InfiniteScroll
      className="videosContainer"
      dataLength={videos.length}
      next={fetchData}
      hasMore={true}
    >
      {videos && videos.map((item) => <VideoCard item={item} />)}
    </InfiniteScroll>
  );
}

export default Videos;
