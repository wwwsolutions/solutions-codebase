// export class HttpException extends Error {
//   status: number;
//   message: string;
//   constructor(status: number, message: string) {
//     super(message);
//     this.status = status;
//     this.message = message;
//   }
// }

export class HttpException extends Error {
  isOperational: boolean;
  status: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
