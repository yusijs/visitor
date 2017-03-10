import express = require('express');
import bodyParser = require('body-parser');
import { router } from './server.router';

const app = express();

app.use(express.static('public/dist'));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(8080, () => {
    console.log("Listening on port 8080");
});