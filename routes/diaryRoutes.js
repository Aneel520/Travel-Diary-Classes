// routes/diaryRoutes.js

const express = require('express');
const router = express.Router();
const DiaryEntry = require('../models/DiaryEntry');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Apply authentication middleware to all routes below

router.get('/', async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.user.userId });
    res.send(entries);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch diary entries' });
  }
});

router.post('/insert', async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const entry = new DiaryEntry({
      title,
      description,
      location,
      user: req.user.userId
    });
    await entry.save();
    res.status(201).send({ message: 'Diary entry created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create diary entry' });
  }
});

// Update a diary entry
router.put('/:id', async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const entry = await DiaryEntry.findByIdAndUpdate(req.params.id, {
      title,
      description,
      location
    });
    if (!entry) {
      return res.status(404).send({ error: 'Diary entry not found' });
    }
    res.status(200).send({ message: 'Diary entry updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to update diary entry' });
  }
});

// Delete a diary entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await DiaryEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).send({ error: 'Diary entry not found' });
    }
    res.status(200).send({ message: 'Diary entry deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to delete diary entry' });
  }
});

module.exports = router;
