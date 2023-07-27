//import * as car from './data.js';
import { Car } from "./models/Car.js";
import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));// set location for static files
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); //Used to parse JSON bodies
app.set('view engine', 'ejs');

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route


app.get('/about', (req,res) => {
    console.log(req.url)
    res.send('This is the about page')
})

app.get('/', (req, res, next) => {
    console.log(req.query);
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
// Update
app.post('/detail', (req,res, next) => {
    Car.findOne({ model:req.body.model }).lean()
        .then((car) => {
            res.render('detail', {result: car} );
        })
        .catch(err => next(err));
});

// Delete
app.delete('/detail', (req,res, next) => {
    Car.findOneAndRemove({ model:req.query.model }).lean()
        .then((car) => {
            res.render('detail', {result: car} );
        })
        .catch(err => next(err));
});


//Get all items
app.get('/api', (req, res, next) => {
    console.log(req.query);
    Car.find({}).lean()
      .then((cars) => {
        // respond to browser only after db query completes
        res.json(cars);
      })
      .catch(err => next(err))
  });
//Get single item
app.get('/api/detail', (req,res,next) => {
    // db query can use request parameters
    Car.findOne({ model:req.body.model })
        .then((car) => {
            res.json(car);
        })
        .catch(err => next(err));
  });
//Update
  app.post('/api/detail', (req,res, next) => {
    const newCar = {'model':'Ford', 'make':'camry', 'year': 2020 }
   Car.updateOne({'model':'Merceeds'}, newCar, {upsert:true}, (err, result) => {
  if (err) return next(err);
    console.log(result);
  // other code here
 })
  Car.findOneAndUpdate({ model:req.body.model }).lean()
        .then((car) => {
            res.json(car);
        })
        .catch(err => next(err));
});


//Delete
app.delete('/api/detail', (req,res, next) => {
    
    Car.findOneAndRemove({ model:req.body.model })
        .then((car) => {
            res.json(car);
        })
        .catch(err => next(err));
});


// define 404 handler
app.use((req,res, next) => {
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('express started'); 
  });


/*
http://127.0.0.1:3000/detail?model=Toyota


<a href="http://google.com">google</a>
 <li><a href="detail?model=<%= car.model %>"><%= car.model %></a></li>

   <% if (result) { %>
        <title><%= model %> Details </title>
        
    <% } else { %>
            <title><%= model %> not found</title>
    <% } %> 
   
*/                        













/*const http = require("http");
const fs = require("fs");
http.createServer((req,res) => {
    let path = req.url.toLowerCase();
    switch(path) {
        case '/':
            fs.readFile("home.html", (err, data) => {
             if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
             res.end(data.toString());
            });
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is Ebtisam. This is my third year in seattle central. My goal is to have a bachelor degree in software development.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);*/