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

    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // this.message = message; // --> comes from Error class

    Error.captureStackTrace(this, this.constructor);
  }
}
