const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const {secret} = require('../config');

class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find();
  }

  async findById(ctx) {
    const {fields} = ctx.query;

    const selectFields = fields.split(';').map(v => ' +' + v).join('');
    const user = await User.findById(ctx.params.id).select(selectFields);

    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
    });
    const {name} = ctx.request.body;
    const repeatedUser = await User.findOne({name});
    if (repeatedUser) {
      ctx.throw(409, '用户名被占用')
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false},
      password: {type: 'string', required: false},
      avatar_url: {type: 'string', required: false},
      gender: {type: 'string', required: false},
      headline: {type: 'string', required: false},
      locations: {type: 'array', itemType: 'string', required: false},
      business: {type: 'string', required: false},
      employments: {type: 'array', itemType: 'object', required: false},
      educations: {type: 'array', itemType: 'object', required: false},
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }

  async login(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }
    const {_id, name} = user;
    const token = jsonwebtoken.sign({_id, name}, secret, {expiresIn: '1d'});
    ctx.body = {token}
  }

  // 确定是用户自己执行该操作
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }
}

module.exports = new UsersCtl();
