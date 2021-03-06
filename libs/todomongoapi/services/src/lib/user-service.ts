/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@codebase/shared/data-access-models';
import { users } from '@codebase/todomongoapi/schemas';

export class UserService {
  public createUser(user_params: User, callback: any) {
    const _session = new users(user_params);
    _session.save(callback);
  }

  public filterUser(query: any, callback: any) {
    users.findOne(query, callback);
  }

  public updateUser(user_params: User, callback: any) {
    const query = { _id: user_params._id };
    users.findOneAndUpdate(query, user_params, callback);
  }

  public deleteUser(_id: string, callback: any) {
    const query = { _id: _id };
    users.deleteOne(query, callback);
  }
}
