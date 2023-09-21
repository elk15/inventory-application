const express = require('express');
const router = express.Router();
const consoleController = require("../controllers/consoleController");

// Multer setup
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage});

// GET request for adding a Console
router.get('/add', consoleController.console_add_get);

// POST request for adding a Console
router.post('/add', upload.single('image'), consoleController.console_add_post);

// GET request for deleting a Console
router.get('/:id/delete', consoleController.console_delete_get);

// POST request for deleting a Console
router.post('/:id/delete', consoleController.console_delete_post);

// GET request for updating a Console
router.get('/:id/update', consoleController.console_update_get);

// POST request for updating a Console
router.post('/:id/update', upload.single('image'), consoleController.console_update_post);

// GET request for one Console
router.get('/:id', consoleController.console_detail);

module.exports = router;