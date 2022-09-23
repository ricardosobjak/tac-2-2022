const mongoose = require('mongoose');

// Modelo / Schema / Coleção
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema, 'user');