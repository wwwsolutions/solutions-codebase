//lib/todomongoapi/routes/src/lib/test-routes.ts

import { Application, Request, Response } from 'express';

export class TestRoutes {
  public route(app: Application) {
    app.get('/api/test', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Get request successful' });
    });
    app.post('/api/test', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Post request successful' });
    });
  }
}
