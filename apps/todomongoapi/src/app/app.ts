//lib/config/app.ts
import * as express from 'express';
import { TestRoutes, CommonRoutes } from '@codebase/todomongoapi/routes';
class App {
  public app: express.Application;
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config();

    // routes
    this.test_routes.route(this.app);
    // always the last route
    this.common_routes.route(this.app);
  }

  private config(): void {
    // support
    // application/json type post data
    // application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: false }));
  }
}
export default new App().app;
