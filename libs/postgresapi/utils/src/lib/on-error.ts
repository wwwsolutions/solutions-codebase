/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const onError = (res: Response, message: string, err: any) => {
  console.error('Promise chain error.', message, err);
  res.status(500).send({ err: 'Internal Server Error', message });
};
