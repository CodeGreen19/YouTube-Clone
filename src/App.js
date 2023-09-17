import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./component/home/HomePage";
import VideoDetail from "./component/videoplay/VideoDetail";
import ChannelDetail from "./component/channel/ChannelDetail";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:channelId" element={<ChannelDetail />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
