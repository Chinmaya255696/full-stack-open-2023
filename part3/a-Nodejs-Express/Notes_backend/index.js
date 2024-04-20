const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Serve static files from the `dist` directory
app.use(express.static(path.join(__dirname, 'dist')));

// Logging middleware for requests
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger);

// API Routes
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
  };

  notes = notes.concat(note);
  response.json(note);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).send({ error: 'Note not found' });
  }
});

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  const body = request.body;

  if (!note) {
    return response.status(404).send({ error: 'Note not found' });
  }

  if (body.content) {
    note.content = body.content;
  }
  if (typeof body.important === 'boolean') {
    note.important = body.important;
  }
  response.json(note);
});

// SPA fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Middleware for handling 404 - Unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
