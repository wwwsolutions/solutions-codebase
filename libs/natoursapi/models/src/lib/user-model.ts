import mongoose from 'mongoose';
import { userSchema } from '@codebase/natoursapi/schemas';

// MODEL
export const User = mongoose.model('User', userSchema);
