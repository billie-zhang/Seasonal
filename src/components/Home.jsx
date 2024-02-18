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
    <div>
      <div className="h-screen flex flex-col items-center justify-center bg-pale-green mt-18">
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
