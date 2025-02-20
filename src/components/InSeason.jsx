import React, { useState, useEffect } from "react";
import "./ShowRecipe.css";

const InSeason = () => {
  const [currentMonth, setCurrentMonth] = useState("");

  const fruitsData = {
    oranges: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
      fact: "Oranges are rich in Vitamin C and antioxidants, promoting healthy skin and immunity.",
    },
    grapefruits: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
      fact: "Grapefruits are an excellent source of Vitamin A, C, and fiber.",
    },
    pomegranates: {
      months: ["October", "November", "December", "January", "February"],
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
    setCurrentMonth(month);
  }, []);

  const fruitsInSeason = Object.entries(fruitsData).filter(([fruit, data]) =>
    data.months.includes(currentMonth)
  );

  return (
    <div className="py-32 mx-16 text-center">
      <h2 className="font-bold text-3xl mb-8">
        Fruits in season in {currentMonth} 📅
      </h2>
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
              <p className="mt-4">{data.fact}</p>
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
