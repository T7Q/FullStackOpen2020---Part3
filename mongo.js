const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tatiana:${password}@cluster0.aogly.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

const newName = process.argv[3];
const newNumber = process.argv[4]

if (newName, newNumber) {
    const contact = new Contact({
        name: newName,
        number: newNumber,
    });

    contact.save().then((result) => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Contact.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person);
        });
        mongoose.connection.close();
    });
}