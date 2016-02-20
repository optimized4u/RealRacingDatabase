var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/records', function(req, res, next) {
  res.render('records', { title: 'Records' });
});

router.get('/reports', function(req, res, next) {
  res.render('reports', { title: 'Reports' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
})

module.exports = router;
