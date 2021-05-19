var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Moola' });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Moola | Login' });
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Moola | Signup' });
});

/* GET transaction page. */
router.get('/transaction', (req, res, next) => {
  res.render('transaction', { title: 'Moola | Transaction' });
});

/* GET history page. */
router.get('/history', (req, res, next) => {
  res.render('history', { title: 'Moola | History' });
});

module.exports = router;
