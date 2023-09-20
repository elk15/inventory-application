const express = require('express');
const router = express.Router();

// GET request for adding a Developer
router.get('/add', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for adding a Developer
router.post('/add', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for deleting a Developer
router.get('/:id/delete', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for deleting a Developer
router.post('/:id/delete', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for updating a Developer
router.get('/:id/update', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST request for updating a Developer
router.post('/:id/update', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for one Developer
router.get('/:id', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;