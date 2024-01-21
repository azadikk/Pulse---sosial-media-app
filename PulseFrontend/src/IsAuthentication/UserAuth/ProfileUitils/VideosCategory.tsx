import React from "react";
import "../MyProfile.scss";

const VideosCategory = () => {
  return (
    <div className="category-videos">
      <div className="box">
          <video src="../examvideo.mp4" muted autoPlay loop/>
      </div>
      <div className="box">
          <video src="../examvideo2.mp4" muted  autoPlay loop/>
      </div>
      <div className="box">
          <video src="../examvideo3.mp4" muted autoPlay loop/>
      </div>
    </div>
  );
};

export default VideosCategory;
