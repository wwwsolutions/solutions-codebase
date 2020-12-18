/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

// ERROR MIDDLEWARE
export const errorMiddleware = (
  {
    err,
    req,
    res,
  }: { err: any; req: Request; res: Response; next: NextFunction } //
): void => {
  console.error('API error handler triggered', err);

  res.status(500).json({
    errorCode: 'ERR-001',
    message: 'Internal Server Error.',
  });
};
