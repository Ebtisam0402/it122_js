
import * as car from './data.js';

import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));// set location for static files
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    console.log(req.url)
    res.render('home', {cars: car.getAll()});
})

app.get('/about', (req,res) => {
    console.log(req.url)
    res.send('This is the about page')
})


app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = car.getItem(req.query.model);
    res.render('detail', {model: req.query.model, result: result});
});


// define 404 handler
app.use((req,res) => {
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