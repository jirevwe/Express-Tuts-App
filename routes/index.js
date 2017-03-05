var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { user : req.user });
});

router.get('/ping', function(req, res){
  res.send('pong!', 200);
});

router.get('/register', function(req, res, next) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
     if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        console.log(req.user);
        res.redirect('/');
      });
  });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
