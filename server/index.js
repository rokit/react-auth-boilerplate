require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const router = require('./router');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

mongoose.Promise = global.Promise;
mongoose.connection.openUri(process.env.MONGODB)

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
	const app = express();

	app.use(bodyparser.json({type: '*/*'}));

	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

	router(app);

	const port = process.env.PORT || 5000;
	app.listen(port, function () {
		console.log(`Listening on port ${port}`);
	});
}