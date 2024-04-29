require('dotenv').config(); // Ensure this is on top if it's not in db.js
require('./DB/db');

const express = require("express");
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const data = require("./Data");
const cors = require("cors");
const Person = require('./models/PhoneBook');

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Alternatively, configure CORS for specific origins
app.use(cors({
  origin: 'http://localhost:5173' // Only allow this origin to access
}));

// Serve static files from the `dist` directory
app.use(express.static(path.join(__dirname, 'dist')));
// Create a 'logs' directory if it doesn't exist
// const logsDir = path.join(__dirname, 'logs');
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir);
// }

// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' })

// setup the logger
//app.use(morgan('tiny', { stream: accessLogStream }))

// Define a custom token for logging request body data
morgan.token('req-body', (req) => {
   return JSON.stringify(req.body);
  })

// Setup the logger with Morgan middleware, including the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

// Use Morgan middleware for logging in 'tiny' format
//app.use(morgan('tiny'));

//app.use(morgan('combined'));


//app.use(morgan('common'));


//app.use(morgan('dev'));


//app.use(morgan('short'));





app.use(express.json());
//app.use(requestLogger)

// Define your routes here
app.get('/', (req, res) => {
  res.json({ message: 'This is CORS-enabled for only localhost:5173.' });
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => res.status(500).json({ error: 'Failed to fetch data' }));
});

app.get("/info", (req, res, next) => {
  Person.countDocuments().then(count => {
    let info = `Phonebook has info of ${count} people <br/>${new Date().toUTCString()}`;
    res.send(info);
  }).catch(error => {
    next(error); // Pass the error to Express's global error handler
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).send("<h4>The Person does not exist in our Database</h4>");
      }
    })
    .catch(error => {
      next(error); 
    });
});




app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params,"Params Data")
  if (!id) {
      return res.status(400).send({ error: 'Missing ID for deletion' });
  }

  Person.findByIdAndDelete(id)
      .then(result => {
          if (result) {
              res.status(204).end();
          } else {
              res.status(404).send({ error: 'No person found with that ID' });
          }
      })
      .catch(error => next(error));
});







app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    const error = new Error('Both name and number are required');
    error.status = 400;
    return next(error);
  }

  // Create a new person without checking for existing one
  const person = new Person({ name, number });
  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(err => next(err));  // Handle errors in saving the new person
});


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' } // Ensure validators run
  )
  .then(updatedPerson => {
      if (!updatedPerson) {
          response.status(404).send({ error: "Person not found" });
      } else {
          response.json(updatedPerson);
      }
  })
  .catch(error => next(error)); 
});



const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'Malformatted ID - The provided ID is not valid.' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'DocumentNotFoundError') {
    return res.status(404).json({ error: 'No document found with the provided ID.' });
  } else if (error.code && error.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key error - the entered data conflicts with existing data.' });
  } else if (error.name === 'MongoServerError') {
    return res.status(500).json({ error: 'Internal MongoDB server error.' });
  }

  // If the error is not recognized, pass it to the default Express error handler
  // that will consider it an internal server error (500)
  next(error);
}

app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(` Server running on http://localhost:${PORT}`);
});
