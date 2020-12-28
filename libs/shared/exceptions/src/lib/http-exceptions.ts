export class HttpException extends Error {
  private isOperational: boolean;
  private status: string;
  // statusCode: number;

  constructor(message: string, public statusCode: number) {
    super(message);

    this.isOperational = true;

    // this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);

    // console.log(
    //   'Hello from HttpException Class!',
    //   'statusCode:',
    //   this.statusCode
    // );
  }
}
