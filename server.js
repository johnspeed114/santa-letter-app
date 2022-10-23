// server.js
// where your node app starts

// init project
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { handleSend, addPost } from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { fireMail } from './helpers/nodemailer.js';
import { cronjobAction } from './cronJobs/cronjob.js';
import data from './db.json' assert { type: 'json' };
//add to nodemailer to test
import nodemailer from 'nodemailer';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//no need to for body parse since express has it build in it
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('combined'));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//location for all static files
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
  // createPost();
});
//posts the child request to db.json
app.post('/posts', async (request, response) => {
  const { username, address, text } = request.body;
  await addPost(username, address, text);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

cronjobAction();
