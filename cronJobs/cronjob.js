import cronjob from 'node-cron';
import { handleSend } from '../database.js';
import { fireMail } from '../helpers/nodemailer.js';

//TODO: not sure how i can send to two function
//solution maybe we need to promisfy the firemail function?
//ask JOHNSON about this
export function cronjobAction() {
  cronjob.schedule('0,15,30,45 * * * * *', async () => {
    try {
      const postVar = await handleSend();
      console.log(postVar);
      if (postVar.length !== 0) {
        for (let x = 0; x < postVar.length; x++) {
          const data = await fireMail(
            postVar[x].username,
            postVar[x].address,
            postVar[x].text
          );
          //need to add the funciton for changing hassent to 1 in the files
          console.log('dfdfdfd', data);
        }
      }
    } catch (err) {
      console.log('Error occurred. ' + err.message);
    }
  });
}
