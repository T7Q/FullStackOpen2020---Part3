require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/phonebook');

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });



app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));

let persons = [
    {
        name: 'Ada Lovelace',
        number: '24-224-222',
        id: 2,
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3,
    },
    {
        name: 'Ada Loverance',
        number: '34',
        id: 8,
    },
];

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has infor for ${persons.length} people</p>
        <p>${new Date()}</p>
        `);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
    // Contact.find({}).then((persons) => {
    //     response.json(persons);
    //     });
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'Name or number missing' });
    } else if (persons.map((person) => person.name).includes(body.name)) {
        return response.status(400).json({ error: 'Name must bre unique' });
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000),
    };
    persons = persons.concat(person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
