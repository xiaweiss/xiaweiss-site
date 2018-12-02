const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const http = require('http')
const https = require('https')
const koaStatic = require('koa-static')
// const enforceHttps = require('koa-sslify')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './../../../site'

// Force HTTPS on all page
// app.use(enforceHttps())

app.use(koaStatic(
  path.join(__dirname, staticPath),
  {maxage: 10 * 24 * 60 * 60 * 1000} // 10 day
))

// SSL options
const options = {
  key: fs.readFileSync('./../xiaweiss.com.key'),
  cert: fs.readFileSync('./../xiaweiss.com.crt')
}

// 允许 node 监听小于 1024 的端口
// sudo setcap cap_net_bind_service=+ep /home/xiawei/.nvm/versions/node/v11.1.0/bin/node

// 设置 pm2 开机启动
// sudo su -c "env PATH=$PATH:/home/xiawei/.nvm/versions/node/v11.1.0/bin pm2 startup -u xiawei --hp /home/xiawei"

// 取消 pm2 开机启动
// pm2 unstartup systemd

// Start the server
http.createServer(app.callback()).listen(80)
https.createServer(options, app.callback()).listen(443)
