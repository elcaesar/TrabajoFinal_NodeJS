import "dotenv/config";
import twilio from "twilio";

const sid = process.env.TW_ACCOUNT;
const token = process.env.TW_TOKEN;
const from = process.env.TW_FROM;

const client = new twilio(sid, token);

const sender = (toNumber, body) => {
  client.messages
    .create({
      to: toNumber,
      body,
      from,
    })
    .then((msg) => console.log(msg.accountSid, msg.status));
};

export default sender;
