const Route = require('koa-router');
const router = Route();
const { index, upload } = require('../controllers/home');


router.get('/', index);
router.post('/upload', upload);


module.exports = router;
