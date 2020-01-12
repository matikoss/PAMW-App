const mongoose = require('mongoose');

const BiblioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 4096
    },
    ownerId: {
        type: String,
        required: true,
        minlength: 1
    },
    files: {
        type: [String]
    }
}, { timestamps: true });

const Biblio = mongoose.model('Biblio', BiblioSchema);

exports.Biblio = Biblio;