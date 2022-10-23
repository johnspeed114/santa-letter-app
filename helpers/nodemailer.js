import nodemailer from 'nodemailer';

//TODO: auth needs to remove user and pass and put them env

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

export async function fireMail(username, address, text) {
  let message = {
    from: 'do_not_reply@northpole.com',
    to: 'santa@northpole.com',
    subject: 'New wish from a child has been requested!',
    html: `<p>Dear Santa Clause,<br><br>
        A child has sent his wish. Below are the details.<br>
        <ul>Username: ${username} </ul>
        <ul>Address: ${address}</ul>
        <ul>Wish: ${text}</ul>
        </p>`,
  };
  console.log('school');
  transporter.sendMail(message, (error, info) => {
    console.log('heeelo');
    if (error) {
      return console.log(error);
    } else {
      //[FYI]If callback argument is not set then the method returns a Promise object.
      //Nodemailer itself does not use Promises internally
      // but it wraps the return into a Promise for convenience.
      console.log('Message sents : %s', info.messageId);
      console.log('Message sents : %s', nodemailer.getTestMessageUrl(info));
    }
  });
}
