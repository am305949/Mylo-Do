const mongoose = require('mongoose');
const middlewares = require('../middlewares/middlewares');

const ToDoSchema = new mongoose.Schema({
    _groupId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true 
    },
    title: {
        type: String,
        trim: true,
        minlength: 3
    },
    discription: {
        type: String,
        trim: true,
        minlength: 3
    },
    createdDate: {
        type: String,
        default: middlewares.formatDate(Date.now())
    },
    finishDate: {
        type: String,
        default: middlewares.setDeadline(7) // add one week as a default deadline
    },
    Completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;