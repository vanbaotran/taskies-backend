import { Twilio } from "twilio";
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.SID_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

//Send WhatsApp message
client.messages
  .create({
    body: "Your appointment is coming up on July 21 at 3PM",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+33781894649",
  })
  .then((message: { sid: any }) => console.log(message.sid))
  .catch((err) => console.error(err));

// //Send SMS
client.messages
  .create({ body: "Hi there", from: "+16813753949", to: "+33781894649" })
  .then((message) => console.log(message.sid))
  .catch((err) => console.error(err));
