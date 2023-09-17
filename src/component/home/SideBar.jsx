import React from "react";
import "./HomePage.css";
import { categories } from "../../utils/sideOption";
import { VideoState } from "../../context/VideoProvider";
import { baseUrl, fetchVideo } from "../../utils/fetchData";

function SideBar() {
  const { setPageToken, setVideos, searchText, setSearchText, darkMode } =
    VideoState();

  //handle search .............
  const handleSubmit = (query) => {
    const url = `${baseUrl}/search?q=${query}&part=snippet%2Cid&maxResults=30`;
    fetchVideo(url).then((data) => {
      setPageToken(data.nextPageToken);
      setVideos(data.items);
    });
  };
  // element click.........
  const handlClick = (cat, i) => {
    setSearchText(cat.name);

    handleSubmit(cat.name);
  };
  return (
    <div className={`sideBar ${darkMode ? "darkMode" : ""}`}>
      <ul>
        {categories.map((cat, i) => (
          <li
            key={cat.name}
            onClick={() => handlClick(cat, i)}
            style={
              cat.name === searchText
                ? { backgroundColor: "#000078", color: "white" }
                : {}
            }
          >
            {cat.icon} {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
