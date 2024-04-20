// models/DiaryEntry.js

const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
