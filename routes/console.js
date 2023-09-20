const express = require('express');
const router = express.Router();

// GET request for adding a Console
router.get('/add', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for adding a Console
router.post('/add', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for deleting a Console
router.get('/:id/delete', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for deleting a Console
router.post('/:id/delete', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for updating a Console
router.get('/:id/update', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for updating a Console
router.post('/:id/update', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for one Console
router.get('/:id', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;