var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login pagina' });
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Signup pagina' });
});

module.exports = router;
