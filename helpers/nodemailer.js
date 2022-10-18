import nodemailer from 'nodemailer';

//TODO: auth needs to remove user and pass and put them env
let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'diego.marks28@ethereal.email',
    pass: 'YvQ1FS9g8Ut8qWE1Jz',
  },
});
export async function sendMail(username, address, text) {
  // Create a SMTP transporter object

  // transporter.verify((err, success) => {
  //   if (err) console.error(err);
  //   console.log('Your config is correct');
  // });

  //this is message

  let message = {
    from: 'do_not_reply@northpole.com',
    to: 'santa@northpole.com',
    subject: 'New wish from a child has been requested!',
    html: `<p>Dear Santa Clause,<br>
        A child has sent his wish. Below are the details.<br>
        <ul>Username: ${username} </ul>
        <ul>Address: ${address}</ul>
        <ul>Wish: ${text}</ul>
        </p>`,
  };
  return transporter.sendMail(message);

  // Preview only available when sending through an Ethereal account\
}
