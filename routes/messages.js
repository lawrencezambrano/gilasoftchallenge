const {Router} = require('express');
const {messagesGet, messagesPost} = require('../controllers/messages');

const router = Router();

router.get('/', messagesGet);

router.post('/', messagesPost);

module.exports = router;