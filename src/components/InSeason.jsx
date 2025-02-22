import React, { useState, useEffect } from "react";
import "./ShowRecipe.css";

const InSeason = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const fruitsData = {
    oranges: {
      months: ["December", "January", "February", "March", "April"],
      locations: ["USA", "Spain", "Italy"],
      emoji: "🍊",
      fact: "Oranges are rich in Vitamin C and antioxidants, promoting healthy skin and immunity.",
    },
    grapefruits: {
      months: ["December", "January", "February", "March", "April"],
      locations: ["USA", "Mexico"],
      emoji: "🍊",
      fact: "Grapefruits are an excellent source of Vitamin A, C, and fiber.",
    },
    pomegranates: {
      months: ["October", "November", "December", "January", "February"],
      locations: ["USA", "India"],
      emoji: "🍑",
      fact: "Pomegranates are packed with antioxidants and Vitamin K.",
    },
    persimmons: {
      months: ["November", "December", "January", "February"],
      emoji: "🍑",
      fact: "Persimmons are a great source of Vitamin A, C, and fiber.",
    },
    kiwis: {
      months: ["November", "December", "January", "February", "March"],
      locations: ["New Zealand", "Italy"],
      emoji: "🥝",
      fact: "Kiwis are high in Vitamin C, K, and antioxidants, supporting heart health.",
    },
    lemons: {
      months: ["November", "December", "January", "February", "March"],
      emoji: "🍋",
      fact: "Lemons are rich in Vitamin C and flavonoids, which help detoxify the body.",
    },
    mandarins: {
      months: ["November", "December", "January", "February"],
      emoji: "🍊",
      fact: "Mandarins are high in Vitamin C and low in calories, perfect for immunity.",
    },
    grapes: {
      months: ["October", "November", "December"],
      emoji: "🍇",
      fact: "Grapes are rich in Vitamin C and antioxidants, which help protect the body from oxidative stress.",
    },
  };

  useEffect(() => {
    const month = new Date().toLocaleString("default", { month: "long" });
    setSelectedMonth(month);
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const fruitsInSeason = Object.entries(fruitsData).filter(
    ([fruit, data]) =>
      data.months.includes(selectedMonth) &&
      (selectedLocation === "" || data.locations.includes(selectedLocation))
  );

  return (
    <div className="py-32 mx-16 text-center">
      <div className="py-4 rounded-lg mb-8">
        <h2 className="font-bold text-3xl">
          Fruits in season in {selectedMonth}
        </h2>
      </div>
      <div className="flex mb-8">
        <p className="italic mr-2">See what's in season in: </p>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="mb-8 p-2 border rounded-md"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <p className="italic ml-4 mr-2">Location: </p>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="mb-8 p-2 border rounded-md"
        >
          <option value="">All Locations</option>
          {["USA", "Spain", "Italy", "Mexico", "India", "New Zealand"].map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            )
          )}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fruitsInSeason.length > 0 ? (
          fruitsInSeason.map(([fruit, data]) => (
            <div
              key={fruit}
              className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold">
                {data.emoji} {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
              </h3>
              <p>Season: {data.months.join(", ")}</p>
              <p className="mt-4">
                <i>{data.fact}</i>
              </p>
            </div>
          ))
        ) : (
          <p>No fruits in season for the selected filters. 😔</p>
        )}
      </div>
    </div>
  );
};

export default InSeason;
