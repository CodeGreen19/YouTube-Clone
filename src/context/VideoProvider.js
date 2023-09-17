import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

function VideoProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [searchText, setSearchText] = useState("");
  return (
    <VideoContext.Provider
      value={{
        darkMode,
        setDarkMode,
        videos,
        setVideos,
        pageToken,
        setPageToken,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export const VideoState = () => {
  return useContext(VideoContext);
};

export default VideoProvider;
