// server.js
// where your node app starts

// init project
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { createPost, addPost } from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendMail } from './helpers/nodemailer.js';
import data from './db.json' assert { type: 'json' };

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
  createPost();
});
//posts the child request to db.json
app.post('/posts', async (request, response) => {
  const { username, address, text } = request.body;
  await addPost(username, address, text);
  console.log('hello');
  try {
    console.log('23333');
    const data = await sendMail(username, address, text);
    console.log('Message sent: %s', data.messageId);
    return response.json({
      username: username,
      address: address,
      text: text,
    });
  } catch (err) {
    console.log('Error occurred. ' + err.message);
    return response.send('error here');
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
