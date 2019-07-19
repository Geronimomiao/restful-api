const jwt = require('koa-jwt');
const Route = require('koa-router');
const router = Route({prefix: '/users'});

const {
    find, findById, create, update,
    delete: del, login, checkOwner
} = require('../controllers/users')

const {secret} = require('../config');

// 在内部帮我们实现 token 提取 校验 及各种用户信息等
const auth = jwt({secret});

router.get('/', find);

router.get('/:id', findById);

router.post('/', create);

// 更新用户部分信息
router.patch('/:id', auth, checkOwner, update);

router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

module.exports = router;
