import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import { connectionString } from "../credentials.js";


mongoose.connect(connectionString, {
    dbName: 'db',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carsSchema = new Schema({
 model: { type: String, required: true },
 make: String,
 color: String,
 year: Date,
 price: Number
});

export const Car = mongoose.model('Car', carsSchema);



