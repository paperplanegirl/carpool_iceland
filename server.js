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

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(ejsLayouts)

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true
}))

// 2. INSTANTIATING THE APP
// configure app to use ejs for template


// app.use(express.static('public'))

// INITIALIZE THE PASSPORT CONFIGURATION AND SESSION AS MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// app.use(function (req, res, next) {
//   // before every route, attach the flash messages and current user to res.locals
//   res.locals.alerts = req.flash()
//   res.locals.currentUser = req.user
//   // console.log('#test:', req.user )
//   next()
// })

app.use( function(req, res, next) {
 if(req.session.passport){
   res.locals.currentUser = req.user
 }
 next()
});
//
// app.get('/auth/login', isLoggedIn, function (req,res) {
  // res.render('index',{firstName:req.user.firstName});
// })

var isLoggedIn = function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/auth/login')
  } else {
    next()
  }
}


app.get('/user', function (req, res) {
  // res.send('hello server is up')
  res.render('auth/signup', {name: 'Carpooling in Iceland'})
})

// app.get('/user', function(req, res) {
//
// db.user.find({where: {email: email1}}).then(function(user){
//        user.update({
//            password: password1
//        }).then(function() {
//            req.flash('success', 'Password Changed');
//            res.redirect('/');
//        })
//      })
//   res.render('auth/passwordreset')
// })


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

// app.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile', {ride: null});
// })


app.get('/profile', isLoggedIn, function(req, res) {
db.user.find({
  where:req.session.passport.user
}).then(function(user) {
  db.ride.findAll( {
  where: {
    userID:req.user.id
  }
}).then(function(ride) {
  console.log("Rides are");
  res.render('profile', {
    user: user,
    ride: ride
      });
    });
  });
});



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



// app.get('/rides', isLoggedIn, function (req, res) {
//   res.render('');
// })

// app.get('/user/rides/edit', function(req, res){
//   db.rides.findAll().then(function(data) {
//     res.json(data)
//   })
// })

app.get('/rides/new', function(req, res) {
  console.log("new rides")
  res.render('new-ride-form')
})

app.get('/logout', function(req, res) {
  console.log("log out success")
  res.render('/auth/logout')
})

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });


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



// READ: GET ONE
app.get('/rides/:id', function (req, res) {
  console.log("show rides")
  db.rides.find({
    where: {id: req.params.id}
  }).then(function (data) {
    res.json(data)
  })
})


app.get('/rides/:id/edit', function (req, res) {
  db.rides.find({
    where: {id: req.params.id}
  }).then(function (data) {
    res.json(data)
  })
})

app.post('/rides/create', isLoggedIn, function(req, res) {
  console.log("#req.body:  ", req.body);
  console.log("#req.user: ", req.user.id);
  db.ride.create({
    Requesting: req.body.Requesting,
    From: req.body.From,
    To: req.body.To,
    Date: req.body.Date,
    Time: req.body.Time,
    Seats: req.body.Seats,
    Mobile: req.body.Mobile,
    NonSmokeCar: req.body.NonSmokeCar,
    Notes: req.body.Notes,
    userID: req.user.id
  }).then(function(data){
    res.redirect('/profile');
    // res.redirect('/rides',{ ride: data});
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
  res.render('rides-edit')
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

var server = app.listen(process.env.PORT || 3000)

module.exports = server
//
// app.listen(3000)
