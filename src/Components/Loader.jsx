import React from "react";
import "../../public/loader.css"
const Loader = () => {
  return (
    <div className="loader_wrapper">
      <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  );
};

export default Loader;
