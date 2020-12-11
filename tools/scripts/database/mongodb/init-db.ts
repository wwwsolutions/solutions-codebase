import mongoose from 'mongoose';
import { environment } from '../../../../libs/shared/environments/src/index';

// SCHEMAS
import { tourSchema } from '../../../../libs/natoursapi/schemas/src/lib/tour-schema';
// DATA
import { toursSimple } from '../../../../libs/natoursapi/fake-data/src/lib/tours-simple';

// CONNECT TO DATABASE
const db: string = environment.mongoConfig.dbCloudConnectionStr;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connection successful!');
  });

// MODELS
const Tour: any = mongoose.model('Tour', tourSchema);
// const User: any = mongoose.model('User', userSchema);

// importCollection()
const importCollection = async (): Promise<void> => {
  try {
    await Tour.create(toursSimple);
    // await Tours.create(tours);

    console.log('Data successfully imported!');
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
  process.exit(0);
};

// deleteCollection()
const deleteCollection = async (): Promise<void> => {
  try {
    await Tour.deleteMany();
    // await User.deleteMany();

    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  process.exit(0);
};

// SCRIPT CONTROL CODE
if (process.argv[2] === '--import') {
  importCollection();
} else if (process.argv[2] == '--delete') {
  deleteCollection();
}

console.log(process.argv);
