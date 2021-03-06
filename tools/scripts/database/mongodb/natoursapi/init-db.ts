import mongoose from 'mongoose';
import { environment } from '../../../../../libs/shared/environments/src/index';

// SCHEMAS
import { tourSchema } from '../../../../../libs/natoursapi/models/src/lib/tour-model';
// DATA
// import { toursSimple } from '../../../../../libs/natoursapi/fake-data/src/lib/tours-simple';
import { tours } from '../../../../../libs/natoursapi/fake-data/src/lib/tours';

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

// tourSchema.pre('save', () => console.log('Hello from pre save'));

// MODELS
const Tour: any = mongoose.model('Tour', tourSchema);
// const User: any = mongoose.model('User', userSchema);

// importCollection()
const importCollection = async (): Promise<void> => {
  try {
    // await Tour.create(toursSimple);
    await Tour.create(tours);
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
