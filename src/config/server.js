
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoDbConnect from './mongoDbConnect.js';
import { create } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import * as url from 'url';
import usuarioRoute from '../routes/users.route.js';
import productoRoute from '../routes/products.route.js';
import authRoute from '../routes/auth.route.js';
//import indexRoute from '../routes/index.route.js';

const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      productos   : '/api/productos',
      carrito     : '/api/carrito',
      usuario     : '/api/usuario',
      auth        : '/api/auth',
      index       : '/'
    };
    this.hbs = create({
      defaultLayout : 'main',
      layoutsDir    : `${__dirname}views/layouts`,
      partialsDir   : `${__dirname}views/partials`,
      extname       : 'hbs'
    });
    this.connectDb()
    this.middlewares()
    this.routes()

  }
  async connectDb(){
    await mongoDbConnect()
  }

  middlewares(){
    this.app.use(fileUpload());
    this.app.use(morgan('dev'));
    this.app.use(express.static(`${__dirname}public`));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended : true}));

    this.app.engine('.hbs', this.hbs.engine);
    this.app.set('view engine', '.hbs');
    this.app.set('views', `${__dirname}views`);
    
  }

  routes(){
    this.app.use(this.path.usuario , usuarioRoute);
    this.app.use(this.path.productos, productoRoute);
    this.app.use(this.path.auth, authRoute);
    this.app.use(this.path.index, productoRoute);
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server Up on port ${this.port}`)
    })
  }
}

export default Server;
