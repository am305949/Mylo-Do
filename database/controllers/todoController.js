const ToDo = require('../models/todo');
const middlewares = require('../middlewares/middlewares');

// ToDo: Create, Update, Delete, ReadOne, ReadAll
module.exports = {
    getAllTodos: (req, res) => {
        ToDo.find({ /*_groupId: req.params.groupId*/ })
            .then(todos => { res.send(todos) })
            .catch((error) => { console.log(error); })
    },

    getTodo: (req, res) => {
        ToDo.findOne({ _id: req.params.todoId })
            .then(todo => { res.send(todo) })
            .catch((error) => { console.log(error); })
    },

    createTodo: (req, res) => {
        (new ToDo({ 'title': req.body.title, 
                    'discription': req.body.discription, 
                    '_groupId': req.body.groupId, 
                    '_userId': req.body.userId,
                    'createdDate': middlewares.formatDate(Date.now()), 
                    'finishDate': req.body.deadline }))
            .save()
            .then(todo => { res.send(todo) })
            .catch((error) => { console.log(error); })
    },

    updateTodo: (req, res) => {
        ToDo.findOneAndUpdate({ _id: req.params.todoId }, { $set: req.body })
            .then(todo => { res.send(todo) })
            .catch((error) => { console.log(error); })
    },

    deleteTodo: (req, res) => {
        ToDo.findByIdAndDelete(req.params.todoId)
            .then(todo => { res.send(todo) })
            .catch((error) => { console.log(error); })
    }
}