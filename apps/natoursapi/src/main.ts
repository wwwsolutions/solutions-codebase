import * as express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';

// FAKE DATA
import { tours } from './dev-data/data/tours-simple';

// ROUTE HANDLER
const getTours = (req: Request, res: Response) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

// ROUTE HANDLER
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

// ROUTE HANDLER
const createTour = (req: Request, res: Response) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
};

// ROUTE HANDLER
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

// ROUTE HANDLER
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

// ROUTES
app.route('/api/v1/tours').get(getTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
