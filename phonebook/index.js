const express = require('express');
const app = express();

let persons = [
    {
      "name": "Ada Lovelace",
      "number": "24-224-222",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Ada Loverance",
      "number": "34",
      "id": 8
    }
  ]

  app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has infor for ${persons.length} people</p>
        <p>${new Date()}</p>
        `);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
