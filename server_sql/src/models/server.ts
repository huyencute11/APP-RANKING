import express, { Application } from 'express';
import connection from './../Connect/Connect';
import routesUser from '../routes/userRoutes'
import routesDefault from '../routes/defaultRoutes'
import routesTerm from '../routes/termRoutes'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class Server {
  private app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = '5000';
    this.middleware();
    this.listen();
    this.connectDB();
    this.routes();

  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
  connectDB() {
    connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to DB')
      }

    })
  }
  middleware() {
    this.app.use(express.json())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors());
    this.app.use(cookieParser());
  }
  routes() {
    this.app.use('/', routesDefault)
    this.app.use('/api/user', routesUser)
    this.app.use('/api/term', routesTerm)

  }

}
export default Server
