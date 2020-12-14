import { errorMiddleware } from './error-middleware';

describe('errorMiddleware', () => {
  it('should work', () => {
    expect(errorMiddleware()).toEqual('error-middleware');
  });
});
