import { postgresapiMiddleware } from './postgresapi-middleware';

describe('postgresapiMiddleware', () => {
  it('should work', () => {
    expect(postgresapiMiddleware()).toEqual('postgresapi-middleware');
  });
});
