//lib/config/app.ts
import * as express from 'express';
import { TestRoutes } from '@codebase/todomongoapi/routes';

class App {
  public app: express.Application;
  private test_routes: TestRoutes = new TestRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.test_routes.route(this.app);
  }

  private config(): void {
    // support
    // application/json type post data
    // application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: false }));
  }
}
export default new App().app;
