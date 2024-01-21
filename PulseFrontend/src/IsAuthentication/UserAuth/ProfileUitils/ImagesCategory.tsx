import React from "react";
import "../MyProfile.scss";

const ImagesCategory = () => {
  return (
    <div className="category-images">
      <div className="box">
          <img src="../examprofile.jpeg" />
      </div>
      <div className="box">
           <img src="../profexam.jpg" />
      </div>
      <div className="box">
           <img src="../pulselogo.svg" />
      </div>
    </div>
  );
};

export default ImagesCategory;
