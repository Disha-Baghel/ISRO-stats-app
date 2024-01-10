// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    async function fetchLaunches() {
      try {
        // Make a GET request to your Express.js backend API endpoint
        const response = await axios.get('http://localhost:3001');
        console.log('API Response: ',response.data);
        setLaunches(response.data);
      } catch (error) {
        console.error('Error fetching launches:', error.message);
      }
    }

    fetchLaunches();
  }, []);

  return (
    <div>
      <h1>ISRO Launches</h1>
      <ul>
        {launches.map((launch) => (
          <li key={launch.UUID}>{launch.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
