
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');
const Group = mongoose.model('Group');

// Get expenses for a group
router.get('/group/:groupId', async (req, res) => {
  try {
    const expenses = await Expense.find({ groupId: req.params.groupId })
      .populate('paidBy', 'name')
      .populate('splitBetween.userId', 'name')
      .sort({ date: -1 });
    
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create expense
router.post('/', async (req, res) => {
  const { title, amount, groupId, paidBy, splitBetween } = req.body;
  
  try {
    // Verify group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    const expense = new Expense({
      title,
      amount,
      groupId,
      paidBy,
      splitBetween
    });
    
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get summary for a user (what they owe, are owed, and spent)
router.get('/summary/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    // Find all expenses where user is involved
    const expenses = await Expense.find({
      $or: [
        { paidBy: userId },
        { 'splitBetween.userId': userId }
      ]
    });
    
    let totalOwed = 0;
    let totalOwe = 0;
    let totalSpent = 0;
    
    expenses.forEach(expense => {
      // If user paid for this expense
      if (expense.paidBy.equals(userId)) {
        totalSpent += expense.amount;
        
        // Add what others owe the user
        expense.splitBetween.forEach(split => {
          if (!split.userId.equals(userId)) {
            totalOwed += split.amount;
          }
        });
      } else {
        // Find how much the user owes from this expense
        const userSplit = expense.splitBetween.find(split => 
          split.userId.equals(userId)
        );
        
        if (userSplit) {
          totalOwe += userSplit.amount;
        }
      }
    });
    
    res.json({
      totalOwed,
      totalOwe,
      totalSpent
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
