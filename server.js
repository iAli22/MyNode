const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000; // For Heroku 

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// MiddleWare ========================== Must be Top ================
app.use((req, res, next) => {
  let now = new Date().toString();  
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable To Append To Server.log');
    }
  });
  next();
});

// app.use((req , res , next) => {
//   res.render('maintenance.hbs' ,{
//     pageTitle : 'soory Site Under Maintenance !',
//     welcome : 'Site Will Be Back Soon .....'
//   });
// });
// ===========================================================
app.use(express.static(__dirname  + '/public'))

hbs.registerHelper('getCurrentDate' , () =>{
  return new Date().getFullYear();
});
// Route
app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcome : 'Welcome To Home Page'
  })
})

app.get('/about', (req , res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page',
  });
}) 

app.get('/bad', (req , res) => {
  res.send({
    errorrMessage : 'ther Is a Problem'
  })
});

app.listen(port , () => {
  console.log(`Server Is Ready On Port: ${port} `)
});