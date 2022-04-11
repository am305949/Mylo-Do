const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;