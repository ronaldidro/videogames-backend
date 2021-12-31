// Libs
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Libs Methods
const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// DB Config
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { console.log('Database Connected!'); })
.catch(e => console.log('error db:', e))

// Routes Setup
app.use('/api/category', require('./routes/category'))
app.use('/api/videogame', require('./routes/videogame'))
app.use('/api/auth', require('./routes/auth'))

// Listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server run on port ' + port);
});