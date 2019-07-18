const Route = require('koa-router');
const router = Route();
const { index } = require('../controllers/home');


router.get('/', index);

module.exports = router;
