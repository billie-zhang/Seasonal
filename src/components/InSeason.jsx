import React, { useState, useEffect } from "react";
import "./ShowRecipe.css";

const InSeason = () => {
  const [currentMonth, setCurrentMonth] = useState("");

  const fruitsData = {
    oranges: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
    },
    grapefruits: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
    },
    pomegranates: {
      months: ["October", "November", "December", "January", "February"],
      emoji: "🍑",
    },
    persimmons: {
      months: ["November", "December", "January", "February"],
      emoji: "🍑",
    },
    kiwis: {
      months: ["November", "December", "January", "February", "March"],
      emoji: "🥝",
    },
    lemons: {
      months: ["November", "December", "January", "February", "March"],
      emoji: "🍋",
    },
    mandarins: {
      months: ["November", "December", "January", "February"],
      emoji: "🍊",
    },
    grapes: { months: ["October", "November", "December"], emoji: "🍇" },
  };

  // Get the current month
  useEffect(() => {
    const month = new Date().toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  // Filter fruits in season based on current month
  const fruitsInSeason = Object.entries(fruitsData).filter(([fruit, data]) =>
    data.months.includes(currentMonth)
  );

  return (
    <div className="py-32 text-center">
      <h2 className="font-bold text-3xl ">
        Fruits in season in {currentMonth} 📅
      </h2>
      <div>
        {fruitsInSeason.length > 0 ? (
          fruitsInSeason.map(([fruit, data]) => (
            <div
              key={fruit}
              style={{
                margin: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3>
                {data.emoji} {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
              </h3>
              <p>Season: {data.months.join(", ")}</p>
            </div>
          ))
        ) : (
          <p>No fruits in season this month. 😔</p>
        )}
      </div>
    </div>
  );
};

export default InSeason;
