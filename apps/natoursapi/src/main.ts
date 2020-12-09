import * as express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';

// FAKE DATA
import { tours } from './dev-data/data/tours-simple';

//'''''''''''''''''''''''''' USERS ROUTE HANDLERS
const getUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

//'''''''''''''''''''''''''' TOURS ROUTE HANDLERS
const getTours = (req: Request, res: Response) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === parseInt(id));

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req: Request, res: Response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
};

const deleteTour = (req: Request, res: Response) => {
  const { id } = req.params;

  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const updateTour = (req: Request, res: Response) => {
  const { id } = req.params;

  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here',
    },
  });
};

//'''''''''''''''''''''''''' MIDDLEWARE

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use((req: Request, res: Response, next): void => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS DECLARATION
const tourRouter = express.Router();
const userRouter = express.Router();

// ROUTES
tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

// MOUNTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// -----------------------------SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
