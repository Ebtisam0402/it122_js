import { Car } from "./models/Car.js";

import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));// set location for static files
app.set('view engine', 'ejs');
app.use(express.json()); //Used to parse JSON bodies

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.get('/about', (req,res) => {
  console.log(req.url)
  res.send('This is the about page')
})

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

app.post('/detail', (req,res, next) => {
  // insert or update a single record
const newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
Book.updateOne({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
  if (err) return next(err);
  console.log(result);
  // other code here
})
      .catch(err => next(err));
});



// define 404 handler
app.use((req,res) => {
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('express started'); 
});
