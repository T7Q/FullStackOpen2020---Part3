require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/phonebook');

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has infor for ${persons.length} people</p>
        <p>${new Date()}</p>
        `);
});

app.get('/api/persons', (request, response) => {
    Contact.find({})
        .then((contacts) => {
            response.json(contacts);
        })
        .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    // const person = persons.find((person) => person.id === id);
    // if (person) {
    Contact.find(id).then((contact) => {
        response.json(contact);
    });
    // } else {
    //     response.status(404).end();
    // }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    Contact.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    // if (!body.name || !body.number) {
    //     return response.status(400).json({ error: 'Name or number missing' });
    // } else if (persons.map((person) => person.name).includes(body.name)) {
    //     return response.status(400).json({ error: 'Name must bre unique' });
    // }
    const contact = new Contact({
        name: body.name,
        number: body.number,
    });
    contact
        .save()
        .then((savedContact) => response.json(savedContact))
        .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
