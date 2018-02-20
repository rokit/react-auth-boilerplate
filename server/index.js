const express = require('express');
// const http = require('http');
const bodyparser = require('body-parser');
const path = require('path');
// const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// const cors = require('cors')
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connection.openUri('mongodb://site:smugpaperbuttonangle@ds123658.mlab.com:23658/saga')

// app.use(morgan('combined'));
// app.use(cors());
app.use(bodyparser.json({type: '*/*'}));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

router(app);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});