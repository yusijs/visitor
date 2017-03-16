import express = require('express');
import bodyParser = require('body-parser');
import compression = require('compression');
import { router } from './server.router';

const app = express();

app.use(express.static('public/dist'));
app.use(bodyParser.json());
app.use(compression());

app.use('/api', router);

app.get('*', (req, res) => {
  res.status(200).sendFile(__dirname + "/public/dist/index.html");
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});