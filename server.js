// 1. SETTING UP THE DEPENDENCIES
var express = require('express')
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var db = require('./models')
var session = require('express-session')
var passport = require('./config/ppConfig')
var flash = require('connect-flash')
var isLoggedIn = require('./middleware/isLoggedIn')
var app = express()

app.use(ejsLayouts)

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true
}))

// 2. INSTANTIATING THE APP
// configure app to use ejs for template
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static('public'))

// INITIALIZE THE PASSPORT CONFIGURATION AND SESSION AS MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})


// app.get('/auth/login', isLoggedIn, function (req, res) {
//   res.render('login')
// })
//
// var isLoggedIn = function (req, res, next) {
//   if (!req.user) {
//     req.flash('error', 'You must be logged in to access that page')
//     res.redirect('/auth/login')
//   } else {
//     next()
//   }
// }

app.get('/user', function (req, res) {
  // res.send('hello server is up')
  res.render('auth/login', {name: 'Carpooling in Iceland'})
})

app.get('/user', function(req, res) {

db.user.find({where: {email: email1}}).then(function(user){
       user.update({
           password: password1
       }).then(function() {
           req.flash('success', 'Password Changed');
           res.redirect('/');
       })
     })
  res.render('auth/passwordreset')
})


app.post('/user', function (req, res) {
  var login = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Email: req.body.Email,
    Password: req.body.Password
  }

  db.rides.create(newRide).then(function (data) {
    res.json(data)
  })
})






// GET '/'
// GET '/rides'
// GET '/rides/:id'
// GET '/user/rides/edit'
// GET '/user/rides/edit/:id'
// POST '/rides'
// PUT '/rides/:id'
// DELETE '/rides/:id'



app.get('/', function (req, res) {
  // res.send('hello server is up')
  res.render('index', {name: 'Carpooling in Iceland'})
})


app.get('/rides', function (req, res) {
  db.rides.findAll().then(function (data) {
    res.json(data)
  })
})

// READ: GET ONE
app.get('/rides/:id', function (req, res) {
  db.rides.find({
    where: {id: req.params.id}
  }).then(function (data) {
    res.json(data)
  })
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

  db.rides.create(newRide).then(function (data) {
    res.json(data)
  })
})

// app.get('/user/rides/edit', function(req, res){
//   db.rides.findAll().then(function(data) {
//     res.json(data)
//   })
// })

app.get('/rides/:id/edit', function (req, res) {
  db.rides.find({
    where: {id: req.params.id}
  }).then(function (data) {
    res.json(data)
  })
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
      id: req.params.id
    }
  }).then(function (ride) {})
  res.json(updateRide)
})

// DELETE
app.delete('/rides/:id', function (req, res) {
  // remove the rides from the object
  db.rides.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    // res.render('index')
    res.json('ride id(' + req.params.id + ') deleted')
  })
})

app.use('/auth', require('./controllers/auth'))

var server = app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

module.exports = server
//
// app.listen(3000)
