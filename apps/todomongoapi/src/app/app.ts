//lib/config/app.ts
import * as express from 'express';
import * as mongoose from 'mongoose';
import env from '../environments/environment';
import { TestRoutes, CommonRoutes } from '@codebase/todomongoapi/routes';
class App {
  public app: express.Application;

  // mongo
  public mongoUrl: string = 'mongodb://localhost/' + env.getDBName();

  // routes
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();

    // routes
    this.test_routes.route(this.app);
    // always as the last route
    this.common_routes.route(this.app);
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
