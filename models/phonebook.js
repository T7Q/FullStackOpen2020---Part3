const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
});

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', contactSchema)

// const Contact = mongoose.model('Contact', contactSchema);

// const newName = process.argv[3];
// const newNumber = process.argv[4];

// if ((newName, newNumber)) {
//     const contact = new Contact({
//         name: newName,
//         number: newNumber,
//     });

//     contact.save().then((result) => {
//         console.log(`added ${result.name} number ${result.number} to phonebook`);
//         mongoose.connection.close();
//     });
// } else {
//     Contact.find({}).then((result) => {
//         result.forEach((person) => {
//             console.log(person);
//         });
//         mongoose.connection.close();
//     });
// }
