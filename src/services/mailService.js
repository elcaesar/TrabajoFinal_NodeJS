import transporter from "../config/nodemailer.js";

const sender = async (options, destination) => {
  const mailOptions = {
    from: "3ra Entrega de Trabajo Final nodeJS",
    to: destination,
    subject: options.subject,
    html: options.html,
  };
  if (options.filename) {
    mailOptions.attachments = [];
    mailOptions.attachments.push({ path: options.filename });
  }

  try {
    await transporter.sendMail(mailOptions);
    //const info = await transporter.sendMail(mailOptions);
    //console.log(info);
  } catch (error) {
    console.log(error);
  }
};

export default sender;
