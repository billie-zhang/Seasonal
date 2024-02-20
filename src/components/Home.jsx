import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const buttonStyle = {
    fontSize: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // A pleasant green
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="h-screen sm:h-[1000px] md:h-screen bg-pale-green pt-[80px] md:pt-[40px] lg:pt-[100px]">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="font-signature m-5 text-3xl font-bold">
          Welcome to Seasonal!
        </div>
        <div className="m-3 text-xl ">
          Pick what's in season, 4 seasons a year
        </div>
        <Link to="/scan">
          <button style={buttonStyle}>Scan Produce</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
