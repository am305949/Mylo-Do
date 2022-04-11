const Group = require('../models/group');
const ToDo = require('../models/todo');

//const ObjectId = (require('mongoose').Types.ObjectId);

// Group: Create, Update, Delete, ReadOne, ReadAll
module.exports = {
    getAllGroups: (req, res) => {
        Group.find({ /*_userId: req.params.userId*/ })
            .then(groups => { res.send(groups) })
            .catch((error) => { console.log(error); })
    },

    getGroup: (req, res) => {
        Group.findOne({ _id: req.params.groupId })
            .then(group => { res.send(group) })
            .catch((error) => { console.log(error); })
    },

    addGroup: (req, res) => {
        (new Group({ '_userId': req.body.userId, 'title': req.body.title })).save()
            .then((group) => { res.send(group) })
            .catch((error) => { console.log(error); })
    },

    updateGroup: (req, res) => {
        Group.findOneAndUpdate({ _id: req.params.groupId }, { $set: req.body })
            .then((group) => { res.send(group) })
            .catch((error) => { console.log(error); })
    },

    deleteGroup: (req, res) => {
        const deleteToDos = (group) => {
            ToDo.deleteMany({ _groupId: group._id })
                .then(() => group)
                .catch((error) => { console.log(error); })
        }
        const group = Group.findByIdAndDelete(req.params.groupId)
            .then((group) => { res.send(deleteToDos(group)) })
            .catch((error) => { console.log(error); })
    }
}

