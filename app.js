const express = require('express');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  const logData = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  console.log(`${req.method} ${req.url}`);
  fs.appendFile(path.join(__dirname, 'server.log'), logData, (err) => {
      if (err) {
          console.error('Failed to log request:', err);
      }
  });
  next();
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
