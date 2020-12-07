import { todomongoapiSchemas } from './user-schema';

describe('todomongoapiSchemas', () => {
  it('should work', () => {
    expect(todomongoapiSchemas()).toEqual('user-schema');
  });
});
