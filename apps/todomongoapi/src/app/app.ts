//lib/config/app.ts
import * as express from 'express';
import * as mongoose from 'mongoose';
import env from '../environments/environment';
import { TestRoutes, CommonRoutes } from '@codebase/todomongoapi/routes';
class App {
  public app: express.Application;

  private dbConnectionString: string =
    'mongodb+srv://todoAppUser:P@ssw0rd@cluster0.qhbkh.mongodb.net/todoApp?retryWrites=true&w=majority';

  // mongo
  // public mongoUrl: string = `${this.dbConnectionString}/${env.getDBName()}`;
  public mongoUrl: string = this.dbConnectionString;

  // routes
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();

    // ROUTES
    this.test_routes.route(this.app);
    this.common_routes.route(this.app); // always set as the last route
  }

  private config(): void {
    // support
    // application/json type post data
    // application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
}
export default new App().app;
