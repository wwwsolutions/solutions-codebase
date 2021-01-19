/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
const hri = require('human-readable-ids').hri;

// TODO: refactor: make it generic
export function databaseErrorHandler(res: Response, err: any) {
  const id = hri.random();
  console.log('Database error ocurred', id, err);
  res.status(500).json({
    code: 'ERR-002',
    message: `Creation of lesson failed with error code: ${id}`,
  });
}
