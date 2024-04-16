const express = require("express");
const morgan = require('morgan');

const app = express();
// Use Morgan middleware for logging in 'tiny' format
app.use(morgan('tiny'));

//app.use(morgan('combined'));


//app.use(morgan('common'));


//app.use(morgan('dev'));


//app.use(morgan('short'));




const data = require("./Data");
app.use(express.json());
//app.use(requestLogger)

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/info", (req, res) => {
  let info = `Phoneboook has info of ${data.length} People <br/>
    ${Date()} `;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = data.find((person) => {
    return person.id === id;
  });

  if (person) {
    res.json(person);
  } else {
    res.status(404).send("<h4>The Person does not exist in our Database</h4>");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const personIndex = data.findIndex((person) => {
    return person.id === id;
  });
  console.log(personIndex);
  if (personIndex !== -1) {
    data.splice(personIndex, 1);
    // const data1 = data.filter((human) => human.id !== id);
    console.log(data);
    res.status(204).send(`<h3>The Person with id ${id} has been deleted</h3>`);
  } else {
    res.status(404).send("<h4>The Person does not exist in our Database</h4>");
  }
});
let generateId = () => {
  const maxId =
    data.length > 0 ? Math.max(...data.map((person) => person.id)) : 0;
  return maxId + 1;
};
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .send("<h4>Person both name or number is missing</h4>");
  }

  exsistingPerson = data.find((person) => person.name === name);

  if (exsistingPerson) {
    return res
      .status(400)
      .send(`<h4>The Person named ${name} already exists in our Database</h4>`);
  }

  const person = {
    name: name,
    number: number,
    id: generateId(),
  };

  data.push(person);

  return res.json(data);
});

const PORT = 3001;

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
