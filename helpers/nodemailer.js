import nodemailer from 'nodemailer';

//TODO: auth needs to remove user and pass and put them env

export async function fireMail(array) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'diego.marks28@ethereal.email',
      pass: 'YvQ1FS9g8Ut8qWE1Jz',
    },
    debug: true,
    logger: true,
  });
  let emailPromiseArray = [];
  await array.forEach(async (ele, i) => {
    let message = {
      from: 'do_not_reply@northpole.com',
      to: 'santa@northpole.com',
      subject: 'New wish from a child has been requested!',
      html: `<p>Dear Santa Clause,<br><br>
            A child has sent his wish. Below are the details.<br>
            <ul>Username: ${ele.username} </ul>
            <ul>Address: ${ele.address}</ul>
            <ul>Wish: ${ele.text}</ul>
            </p>`,
    };

    await send(transporter, message)
      .then(() => {
        emailPromiseArray.push({ success: true, user: ele.username });
      })
      .catch((error) => {
        console.log('failed to send', error);
      });
    console.log(check);
  });
}

async function send(transporter, message) {
  return new Promise(async (resolve, reject) => {
    console.log(message, 'fi2321');
    await transporter.sendMail(message, (error, info) => {
      console.log('heeelo');
      if (error) {
        console.log(error, 'ddd');
        return reject(error);
      } else {
        //[FYI]If callback argument is not set then the method returns a Promise object.
        //Nodemailer itself does not use Promises internally
        // but it wraps the return into a Promise for convenience.
        // console.log('Message sents : %s', info.messageId);
        // console.log('Message sents : %s', nodemailer.getTestMessageUrl(info));
        return resolve();
      }
    });
  });
}
