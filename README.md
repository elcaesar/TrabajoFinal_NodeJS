# TRABAJO FINAL CURSO NODEJS - CODERHOUSE
## AMERICO CESAR ROMERO

El presente proyecto es una API REST que tiene un componente en frontend realizado con el motor de plantillas `handlebars` en el servidor. 
El usuario al ingresar a la raiz de la dirección URI se mostrará una lista de productos en stock que simula una lista de libros que el usuario puede comprar.
También se mostrará un cuadro de chat hecho con Websockets.
Se utilizó la base de datos `MongoDB Atlas` (nube) a través de `Mongoose`.

El usuario deberá estar `registrado` y luego tendrá que ingresar con su usuario y contraseña (`login`). Se utilizó el módulo `JWT` para las autentificaciones, el password se encriptó mediante el módulo `bcrypt` el usuario logueado podrá cargar el producto en su `carrito` y podrá repetir los pasos agregando los productos al carrito y luego para finalizar hará efectivo la `orden` para efectivizar el pago.
Una vez concluido el sistema enviará al mail del comprador los datos de la compra utilizando el servicio `Twilio` y el módulo `Nodemailer`.


### INSTRUCCIONES

1. Clonar repositorio con `git clone` o descargar el `zip`
2. Ejecutar `npm install` para instalar todas las dependecias
3. Renombrar el archivo .`env.example` a `.env` y completar con los datos.
4. Ejecutar `npm run dev` para nodemon o `npm start` para disparar con node

