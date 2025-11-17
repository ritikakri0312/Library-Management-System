const express = require('express');
const router = express.Router();

const {
  issueBook,
  returnBook,
  getTransactions
} = require('../controllers/transactionController');

router.post('/issue', issueBook);
router.post('/return', returnBook);
router.get('/', getTransactions);

module.exports = router;
