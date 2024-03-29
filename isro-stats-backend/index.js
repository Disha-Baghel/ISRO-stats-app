// index.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Replace this with the actual URL of the ISRO Stats API
const ISRO_API = 'https://services.isrostats.in/api/launches';

// Example endpoint using axios
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(ISRO_API);
    const launchesData = response.data;
    res.json(launchesData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
