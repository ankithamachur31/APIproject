// CalorieCalculator.js

import React, { useState } from 'react';


const CalorieCalculator = () => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState(0);
  const [fetchedCalories, setFetchedCalories] = useState(null);

  const handleCalculate = async () => {
    const url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${activity}&duration=${duration}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8ee5fb0b30msh84a3dee72b4968ap132f87jsnd0f83dc4e63b',
        'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      setFetchedCalories(data);

    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
  };


  return (
    <div className="calorie-calculator">
      <h1 className="title">Calories Burnt Calculator</h1>
      <div className="input-group">
        <label className="label" htmlFor="activity">
          Select Activity:
        </label>
        <input
          type="text"
          id="activity"
          name="activity"
          className="input"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="duration">
          Duration (minutes):
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          className="input"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </div>
      <button className="button" onClick={handleCalculate}>
        Calculate
      </button>
      {fetchedCalories && fetchedCalories.map((data, index) => (
        <div key={index} className="card">
          <h3 className="activity-name">{data.name}</h3>
          <p>Calories per hour: {data.calories_per_hour}</p>
          <p>Duration (minutes): {data.duration_minutes}</p>
          <p>Total calories: {data.total_calories}</p>
        </div>
      ))}
    </div>
  );
};

export default CalorieCalculator;
