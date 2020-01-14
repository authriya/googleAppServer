const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const data = require('./app-data.js')

app.use(morgan('common'))
app.use(cors());

app.get('/apps', (req, res) => {
const { genres, sort } = req.query;

  if (genres) {
    if (!['Action', 'action', 'Puzzle', 'puzzle', 'Strategy', 'strategy', 'Casual', 'casual', 'Arcade', 'arcade', 'Card', 'card'].includes(genres)) {
      return res
        .status(400)
        .send('Genres must be one of the following- Action, Puzzle, Strategy, Casual, Arcade, or Card.');
    }
  }

  if (sort) {
      if(!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be either Rating or App')
      }
  }

  if(genres) {
    results = data
        .filter(item =>
            item
              .Genres
              .toLowerCase()
              .includes(genres.toLowerCase()));
    } else {
        results = data
    }

  if (sort) {
    results
      .sort((a, b) => {
        return b[sort] > a[sort] ? 1 : b[sort] < a[sort] ? -1 : 0;
    });
  }

  res
    .json(results);
  });
  
  app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });