import mongoose from 'mongoose';
import { tourSchema } from '@codebase/natoursapi/schemas';

// MODEL
export const Tour = mongoose.model('Tour', tourSchema);
