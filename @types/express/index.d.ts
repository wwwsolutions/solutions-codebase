// Extend Express Request and Response : Typescript Declaration Merging
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/passport/index.d.ts

declare namespace Express {
  interface Request {
    token: any;
    requestTime: any;
    user: any;
  }

  interface Response {
    token: any;
    requestTime: any;
    user?: any;
  }
}
