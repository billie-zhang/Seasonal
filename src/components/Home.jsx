import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-pale-green">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="font-signature m-5 text-3xl font-bold">
          Welcome to Seasonal!
        </div>
        <div className="m-3 pb-5 text-xl ">
          Pick what's in season, 4 seasons a year
        </div>
        <Link to="/scan">
          <button className="text-xl px-6 py-5 bg-green text-white border-none rounded-md cursor-pointer">
            Scan Produce
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
