
const express = require('express');
const router = express.Router();
const  {submitVote,getVotes,getCounts,getResults} = require('../controllers/voteControllers');

router.post('/vote', submitVote);
router.get('/data', getVotes);
router.get('/counts', getCounts);

router.get('/results', getResults);

module.exports = router;
