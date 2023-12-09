const express = require('express');
const router = express.Router();
// import app controller for both income and expense
const appCtrl = require('../controllers/app.js');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /app to display the app page
router.get('/app', appCtrl);
