const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
const routes = require('./routes/routes');
app.use('/api', routes);

const port = 8080;


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
  
  //   // Handle preflight requests
  //   if (req.method === 'OPTIONS') {
  //     res.sendStatus(200);
  //   } else {
  //     next();
  //   }
  // });

