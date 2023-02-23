const {Router} = require('express');
const {webApp} = require('../controllers/webapp');

const router = Router();

router.get('/', webApp);

module.exports = router;