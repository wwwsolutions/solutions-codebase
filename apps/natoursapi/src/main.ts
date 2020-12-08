import * as express from 'express';

// FAKE DATA
import { tours } from './dev-data/data/tours-simple';

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getOneTour = (req, res) => {
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

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
};

const deleteTour = (req, res) => {
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

const updateTour = (req, res) => {
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

//''''''''''''''''''''''''''

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all tours
app.get('/api/v1/tours', getAllTours);

// Get one tour
app.get('/api/v1/tours/:id', getOneTour);

// DELETE
// app.patch('', (req, res) =>)
app.delete('/api/v1/tours/:id', deleteTour);

// PUT, PATCH
app.patch('/api/v1/tours/:id', updateTour);

// Create new tour
app.post('/api/v1/tours', createTour);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
