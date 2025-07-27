
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const Expense = mongoose.model('Expense');

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('members.userId', 'name email');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single group with expenses
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members.userId', 'name email');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    const expenses = await Expense.find({ groupId: req.params.id })
      .populate('paidBy', 'name')
      .populate('splitBetween.userId', 'name');
    
    res.json({ group, expenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create group
router.post('/', async (req, res) => {
  const { name, description, memberIds } = req.body;
  
  try {
    const group = new Group({
      name,
      description,
      members: memberIds.map(id => ({ userId: id }))
    });
    
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add member to group
router.post('/:id/members', async (req, res) => {
  const { userId } = req.body;
  
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    // Check if already a member
    if (group.members.some(member => member.userId.equals(userId))) {
      return res.status(400).json({ message: 'User is already a member' });
    }
    
    group.members.push({ userId });
    await group.save();
    
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
