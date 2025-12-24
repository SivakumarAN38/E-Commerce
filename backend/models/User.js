const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Use async pre hook WITHOUT next parameter (return a Promise)
UserSchema.pre('save', async function() {
  // 'this' is the document
  if (!this.isModified('password')) return;

  // hash and set password
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

UserSchema.methods.comparePassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

module.exports = mongoose.model('User', UserSchema);
