/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const onSuccess = (res: Response, data: any) => {
  if (data.length) {
    res.status(200).json({
      status: 'success',
      results: data.length,
      payload: data,
    });
  } else {
    res.status(200).json({
      status: 'success',
      payload: data,
    });
  }
};
