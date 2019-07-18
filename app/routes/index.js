/*
*  实现自动化 批量注册路由
* */

const fs = require('fs');

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => { // 同步读取文件
    if (file === 'index.js') {return;}
    const router = require(`./${file}`);
    app.use(router.routes()).use(router.allowedMethods());
  });
};
