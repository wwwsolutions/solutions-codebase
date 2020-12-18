import { postgresapiSchemas } from './postgresapi-schemas';

describe('postgresapiSchemas', () => {
  it('should work', () => {
    expect(postgresapiSchemas()).toEqual('postgresapi-schemas');
  });
});
