// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = async function (event) {
  // TODO: check the text isn't more than 100chars before submitting
  //Do we need this? Since the html textarea already limits to 100 characters
  event.preventDefault();
  const usernameVal = document.getElementById('userName').value;
  const textReqVal = document.getElementById('textRequest').value;

  const userProfilesApi =
    'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';
  const usersApi =
    'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';

  const userProfiles = await fetch(userProfilesApi).then((res) => res.json());
  const users = await fetch(usersApi).then((res) => res.json());
  const found = findUserName(users, usernameVal);

  if (found.length === 1) {
    //another conditon if the child is too old
    const userName = found[0].username;

    const foundProfile = findUserProfile(userProfiles, found[0].uid);
    const birthDate = foundProfile[0].birthdate;
    const age = getAge(birthDate);
    if (age < 10) {
      handleNewPage(
        false,
        'Congratulations! Your wish has been sent to Santa!'
      );
      postData(userName, birthDate, textReqVal);
    } else handleNewPage(true, 'You are too old, kid!');
  } else
    handleNewPage(true, "Sorry this username hasn't been resgistered yet...");
};

function findUserName(users, username) {
  return users.filter(function (user) {
    return user.username === username;
  });
}

function findUserProfile(userProfiles, userId) {
  return userProfiles.filter(function (user) {
    return user.userUid === userId;
  });
}

function getAge(bdate) {
  let split = bdate.split('/');
  const today = new Date();
  const birthDate = new Date(split[0], split[2] - 1, split[1]);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function handleNewPage(bool, text) {
  document.write(
    `<html><head><title>A letter to Santa</title></head><body>${
      bool ? '<h2>Not Found: </h2>' : ''
    }${text}</body></html>`
  );
}

async function postData(username, address, text) {
  try {
    const res = await fetch('/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        address: address,
        text: text,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
