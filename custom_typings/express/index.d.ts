// Extend Express Request and Response : Typescript Declaration Merging
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// https://truetocode.com/extend-express-request-and-response-typescript-declaration-merging/

declare namespace Express {
  export interface Request {
    token: any;
    requestTime: any;
  }

  export interface Response {
    token: any;
    requestTime: any;
  }
}
