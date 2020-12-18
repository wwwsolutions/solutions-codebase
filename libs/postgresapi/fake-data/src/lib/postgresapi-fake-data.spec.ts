import { postgresapiFakeData } from './postgresapi-fake-data';

describe('postgresapiFakeData', () => {
  it('should work', () => {
    expect(postgresapiFakeData()).toEqual('postgresapi-fake-data');
  });
});
