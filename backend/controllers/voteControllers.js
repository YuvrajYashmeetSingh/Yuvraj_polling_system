const db = require('../config/db');

// Function to submit a vote
const submitVote = async (req, res,next) => {
  try {
    const { name, voting_choice, casted_at } = req.body;
    const [result] = await db.query(
      'INSERT INTO votes (name, voting_choice, casted_at) VALUES (?, ?, ?)',
      [name, voting_choice, casted_at]
    );
    res.status(201).json({ id: result.insertId, name, voting_choice, casted_at });
  } catch (error) {
    console.log("Error found:", error);
    next(error)
  }
};

// Function to get all votes
const getVotes = async (req, res,next) => {
  try {
    const [votes] = await db.query('SELECT * FROM votes');
    res.status(200).json({ data: votes });
  } catch (error) {
    next(error)
  }
};

// Function to get counts of votes based on voting choice
const getCounts = async (req, res,next) => {
  try {
    const { voting_choice } = req.query;
    const [counts] = await db.query(
      'SELECT DATE(casted_at) as date, COUNT(*) as count FROM votes WHERE voting_choice = ? GROUP BY DATE(casted_at) ORDER BY DATE(casted_at)',
      [voting_choice]
    );
    res.status(200).json({ data: counts });
  } catch (error) {
    
    next(error)
  }
};

// Function to get results of votes
const getResults = async (req, res,next) => {
  try {
    const [results] = await db.query(
      'SELECT voting_choice, COUNT(*) as count FROM votes GROUP BY voting_choice'
    );
    res.status(200).json({ data: results });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  submitVote,
  getVotes,
  getCounts,
  getResults,
};
