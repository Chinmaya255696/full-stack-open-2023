const express = require("express");
const app = express();
const data = require("./Data");
app.use(express.json());

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
  console.log(personIndex)
 if (personIndex !== -1) {
    data.splice(personIndex, 1);
   // const data1 = data.filter((human) => human.id !== id);
    console.log(data);
    res.status(204).send(`<h3>The Person with id ${id} has been deleted</h3>`)
  }else{
    res.status(404).send("<h4>The Person does not exist in our Database</h4>");
  }
  
})

const PORT = 3001;

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
