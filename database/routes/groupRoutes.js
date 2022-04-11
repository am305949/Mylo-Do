const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');

const groupController = require('../controllers/groupController');

router.get('/', groupController.getAllGroups);
router.get('/:groupId', groupController.getGroup);
router.post('/', groupController.addGroup);
router.patch('/:groupId', groupController.updateGroup);
router.delete('/:groupId', groupController.deleteGroup);

module.exports = router;