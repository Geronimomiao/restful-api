const Route = require('koa-router');
const router = Route({prefix: '/users'});

const {find, findById, create, update,
    delete: del, login} = require('../controllers/users')

router.get('/', find);

router.get('/:id', findById);

router.post('/', create);

// 更新用户部分信息
router.patch('/:id', update);

router.delete('/:id', del);

router.post('/login', login);

module.exports = router;
