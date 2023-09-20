const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developerController");

// GET request for adding a Developer
router.get('/add', developerController.developer_add_get);

// POST request for adding a Developer
router.post('/add', developerController.developer_add_post);

// GET request for deleting a Developer
router.get('/:id/delete', developerController.developer_delete_get);

// POST request for deleting a Developer
router.post('/:id/delete', developerController.developer_delete_post);

// GET request for updating a Developer
router.get('/:id/update', developerController.developer_update_get);

// POST request for updating a Developer
router.post('/:id/update', developerController.developer_update_post);

// GET request for one Developer
router.get('/:id', developerController.developer_get);

module.exports = router;