const Transaction = require('../models/Transaction');   // FIXED
const Book = require('../models/Book');                 // FIXED
const Student = require('../models/Student');           // already correct

// 🟢 ISSUE A BOOK
// POST: /api/transactions/issue
const issueBook = async (req, res) => {
  try {
    const { bookId, studentId } = req.body;

    // 1️⃣ Check if book is available
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'issued') {
      return res.status(400).json({ message: 'Book is already issued' });
    }

    // 2️⃣ Check if student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.status === 'active') {
      return res.status(400).json({ message: 'Student already has a book issued' });
    }

    // 3️⃣ Create transaction
    const transaction = new Transaction({
      bookId,
      studentId,
      status: 'issued',
      issueDate: new Date()
    });

    await transaction.save();

    // 4️⃣ Update book & student status
    await Book.findByIdAndUpdate(bookId, { status: 'issued' });
    await Student.findByIdAndUpdate(studentId, { status: 'active' });

    res.status(201).json({ message: 'Book issued successfully', transaction });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 RETURN A BOOK
// POST: /api/transactions/return
const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    transaction.status = 'returned';
    transaction.returnDate = new Date();
    await transaction.save();

    await Book.findByIdAndUpdate(transaction.bookId, { status: 'available' });
    await Student.findByIdAndUpdate(transaction.studentId, { status: 'inactive' });

    res.json({ message: 'Book returned successfully', transaction });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 GET all transactions
// GET: /api/transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction
      .find()
      .populate('bookId', 'title author')
      .populate('studentId', 'name rollNo');

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { issueBook, returnBook, getTransactions };
