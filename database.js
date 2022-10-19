import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { post } from 'request';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

export async function createPost() {
  //Use JSON file for storage

  // db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  //commented this out until i create a new post function for adding posts
  db.data ||= { posts: [] };
  await db.write();
}

export async function addPost(username, address, text) {
  //Use JSON file for storage
  // db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  //TODO: need to create another post create for adding posts
  //TODO: need accept props from the server app.post
  const newData = {
    username: username,
    address: address,
    text: text,
    hasSent: '0',
  };
  //commented this out until i create a new post function for adding posts
  //db.data ||= { posts: [] };
  db.data.posts.push(newData);
  await db.write();
}

export async function handleSend() {
  console.log(db);
  let posts = await db.data.posts.filter((post) => post.hasSent === '0');
  for (let post of posts) {
    post.hasSent.assign('1').value();
    db.write();
  }
  return posts;
}

//json database structure
//posts: [{
/*  username: "",str
    address: "",str
    text: "",str
    hasSent: 0, bool of 0 or 1
}
]

*/
