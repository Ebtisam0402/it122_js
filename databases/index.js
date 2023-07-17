import { Car } from "./models/Car.js";

import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));// set location for static files
app.set('view engine', 'ejs');

// return all records
Car.find({}).lean()
  .then((cars) => {
    console.log(cars);
  })
  .catch(err => next(err));

// return all records that match a condition
Car.find({"make": "camry" }).lean()
  .then((cars) => {
    console.log(cars);
  })
  .catch(err => next(err));

// return a single record
Car.findOne({"model": "Toyota" }).lean()
  .then((car) => {
      console.log(car);
  })
  .catch(err => next(err));

// insert or update a single record
const newCar = {'model':'Toyota', 'make':'camry', 'year': 2023 }
Car.updateOne({'model':'Toyota'}, newCar, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
});


app.get('/', (req, res, next) => {
  Car.find({}).lean()
    .then((cars) => {
      // respond to browser only after db query completes
      res.render('home', { cars });
    })
    .catch(err => next(err))
});

app.get('/detail', (req,res,next) => {
  // db query can use request parameters
  Car.findOne({ model:req.query.model }).lean()
      .then((car) => {
          res.render('detail', {result: car} );
      })
      .catch(err => next(err));
});