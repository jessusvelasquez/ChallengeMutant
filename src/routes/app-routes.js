const { Router } = require('express');
const router = Router();

const { dnaAnalysis } = require('../controllers/app-controllers');
const { getStats } = require('../controllers/stats-controllers');

//routes

router.post('/mutant', dnaAnalysis);
router.get('/stats', getStats);

module.exports = router;