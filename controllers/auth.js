var express = require('express')
var db = require('../models')
var passport = require('../config/ppConfig')
var router = express.Router()

router.get('/signup', function (req, res) {
  res.render('auth/signup')
})

router.post('/signup', function (req, res) {
  // try sending back the form data
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
  }).spread(function (user, created) {
    if (created) {
      // if created, success and redirect home
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res)
    } else {
      // if not created, the email already exists
      req.flash('error', 'Email already exists')
      res.redirect('/auth/signup')
    }
  }).catch(function (error) {
    // if an error occurs, let's see what the error is
    req.flash('error', error.message)
    res.redirect('/auth/signup')
  })
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))

router.get('/logout', function (req, res) {
  req.logout()

  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
