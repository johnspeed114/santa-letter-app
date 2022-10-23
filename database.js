import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

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
  db.data.posts.push(newData);
  await db.write();
  console.log(db.data);
}

export async function handleSend() {
  await db.read();
  let posts = await db.data.posts.filter((post) => post.hasSent === '0');
  for (let post of posts) {
    //Should I change sent value here or at the cronjob?
    post.hasSent = '1';
    console.log(post.hasSent);
    await db.write();
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
