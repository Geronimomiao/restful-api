const Route = require('koa-router');
const router = Route({prefix: '/users'});

const {find, findById, create, update, delete: del} = require('../controllers/users')

router.get('/', find);

router.get('/:id', findById);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', del);

module.exports = router;
