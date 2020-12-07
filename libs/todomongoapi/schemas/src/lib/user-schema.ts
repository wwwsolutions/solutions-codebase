import * as mongoose from 'mongoose';
import { ModificationNote } from '@codebase/shared/data-access-models';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: {
      first_name: String,
      middle_name: String,
      last_name: String,
    },
  },
  email: String,
  phone_number: String,
  gender: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  modification_notes: [ModificationNote],
});

export const users = mongoose.model('users', schema);

// export default mongoose.model('users', schema);
