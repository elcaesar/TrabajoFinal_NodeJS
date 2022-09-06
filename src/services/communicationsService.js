import "dotenv/config";
import { join } from "path";

import senderMail from "./mailService.js";
import senderSMS from "./twilioService.js";
import __dirname from "../utils.js";

export const sendMailRegister = async (user) => {
  try {
    let html;
    const filename = join(__dirname, "..", "public", "uploads", user.avatar);

    const mailAdmin = process.env.MAIL_ADMIN;
    const dataUser = `
  <h4>Datos:</h4>
  <ul>
  <li>Nombre: ${user.nombre}</li>
  <li>Edad: ${user.edad}</li>
  <li>Celular: ${user.celular}</li>
  <li>Direccion: ${user.direccion}</li>
  <li>Email: ${user.email}</li>
  </ul>`;

    html = "<h1>Registro de nuevo usuario</h1>" + dataUser;
    let mailOptions = {
      subject: "Registro de nuevo usuario",
      html,
      filename,
    };
    await senderMail(mailOptions, mailAdmin);

    html = "<h1>Gracias por registrarse !!</h1>" + dataUser;
    mailOptions = {
      subject: "Sus datos del registro",
      html,
      filename,
    };
    await senderMail(mailOptions, user.email);
  } catch (error) {
    console.log(error);
  }
};

export const senderMailCart = async (cartProducts, emailUser) => {
  try {
    const mailAdmin = process.env.MAIL_ADMIN;

    let html = `<!DOCTYPE html><html lang="en">`;
    html += htmlHead() + `<body>`;
    html += `
    <h4>Datos del pedido:</h4>
    <table class="myTable">
      <tr>
        <th>Producto</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Sub Total</th>
      </tr>
      `;
    let totalGeneral = 0;
    cartProducts.forEach((element) => {
      totalGeneral += element.precio * element.cantidad;
      html += `<tr>
                <td>${element.nombre}</td>
                <td>${element.descripcion}</td>
                <td>$ ${element.precio}</td>
                <td>${element.cantidad}</td>
                <td>$ ${element.precio * element.cantidad}</td>
              </tr>
              `;
    });
    html += `</table>`;
    html += `<p>Total General: $ ${totalGeneral}</p>`;

    html += `</body></html>`;

    let mailOptions = {
      subject: "Nuevo pedido !!",
      html,
    };
    await senderMail(mailOptions, mailAdmin);

    mailOptions = {
      subject: "Su pedido",
      html,
    };
    await senderMail(mailOptions, emailUser);
  } catch (error) {}
};

export const sendSMS = (bodyMessage) => {
  const to = process.env.TW_TO;
  senderSMS(to, bodyMessage);
};

const htmlHead = () => {
  const html = `
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
      .myTable {
        background-color: #eee;
        border-collapse: collapse;
      }
      .myTable th {
        background-color: #000;
        color: white;
      }
      .myTable td,
      .myTable th {
        padding: 5px;
        border: 1px solid #000;
      }
    </style>
    </head>
`;

  return html;
};
