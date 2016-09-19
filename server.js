//1. SETTING UP THE DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var db = require('./models')

//2. INSTANTIATING THE APP
//configure app to use ejs for template
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static('public'))

//GET '/'
//GET '/rides'
//GET '/rides/:id'
//GET '/user/rides/edit'
//GET '/user/rides/edit/:id'
//POST '/rides'
//PUT '/rides/:id'
//DELETE '/rides/:id'

function isLoggedIn (req, res, next) {

}

app.get('/', function(req, res) {
  // res.send('hello server is up')
  res.render('index', {name:'Carpooling in Iceland'})
})

app.get('/rides', function(req, res){
  db.rides.findAll().then(function(data) {
    res.json(data)
  });
});

// READ: GET ONE
app.get('/rides/:id', function (req, res) {
  db.rides.find({
    where: {id:req.params.id}
  }).then(function(data) {
    res.json(data)
  });
})

app.post('/rides', function (req, res) {
  var newRide = {
      Requesting: req.body.Requesting,
      From: req.body.From,
      To: req.body.To,
      Date: req.body.Date,
      Time: req.body.Time,
      Seats: req.body.Seats,
      Mobile: req.body.Mobile,
      Email: req.body.Email,
      NonSmokeCar: req.body.NonSmokeCar,
      Notes: req.body.Notes
  }

  db.rides.create(newRide).then(function(data) {
    res.json(data)
  });
})

// app.get('/user/rides/edit', function(req, res){
//   db.rides.findAll().then(function(data) {
//     res.json(data)
//   });
// });

app.get('/rides/:id/edit', function (req, res){
  db.rides.find({
    where: {id:req.params.id}
  }).then(function(data) {
    res.json(data)
  });
})


app.put('/rides/:id', function (req, res) {
  var updateRide = {
      Requesting: req.body.Requesting,
      From: req.body.From,
      To: req.body.To,
      Date: req.body.Date,
      Time: req.body.Time,
      Seats: req.body.Seats,
      Mobile: req.body.Mobile,
      NonSmokeCar: req.body.NonSmokeCar,
      Notes: req.body.Notes
  }

  db.rides.update(updateRide, {
    where: {
      id:req.params.id
    }
  }).then(function(ride) {

  });
  res.json(updateRide)
})

// DELETE
app.delete('/rides/:id', function (req, res) {
  // remove the rides from the object
  db.rides.destroy({
    where: {
      id:req.params.id
    }
  }).then(function(ride) {
  });
  res.json(data)
})



var server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
})

module.exports = server;
//
// app.listen(3000);
