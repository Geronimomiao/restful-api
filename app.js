const Koa = require('koa'); // 类名一般要大写
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const paramter = require('koa-parameter');
const mongoose = require('mongoose');

const routing = require('./app/routes');
const {connectionStr} = require('./app/config');

const app = new Koa(); // 实例化

mongoose.connect(connectionStr, {useNewUrlParser: true}, () => console.log('MongoDB 连接成功'));
mongoose.connection.on('error', console.error);

// 生产环境 返回报错信息
app.use(error({
    postFormat: (e, {stack, ...rest}) =>
      process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
  }
));
app.use(bodyparser());
app.use(paramter(app));
routing(app);


app.listen(3000, () => {
  console.log('running at 3000');
});
