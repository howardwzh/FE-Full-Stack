const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const _ = require('lodash')
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const host = 'http://localhost:9099'

server.use(middlewares)
server.use(bodyParser.urlencoded({ extended: true }), bodyParser.json({ limit: '10mb', extended: true }))

const autoServer = () => {
  const DB = JSON.parse(fs.readFileSync('./db/origin_db.json', 'utf8'))
  let newDB = {}
  _.map(DB, (v, k) => {
    /**
     * k的描述：
     * 可指定请求方式：         get=>/cardniu/x/v1/getEntryStatus
     * 默认为post请求，可省略： /cardniu/x/v1/getEntryStatus
     */
    const type = k.match(/^([a-z]+)=>/) ? k.match(/^([a-z]+)=>/)[1] : 'post' // 截取-请求方式
    const url = k.match(/>?([a-zA-Z0-9\/-]+)$/)[1] // 截取-请求url
    const shortK = k.match(/[^\/]+$/)[0] // 截取-jsonserver数据key

    newDB[shortK] = v // 循环-生成新的对象

    /** 配置-请求接口规则 */
    server[type](url, (req, res) => {
      request.get(host + '/' + shortK + '/', (error, response, body) => {
        res.jsonp(JSON.parse(body))
      })
    })
  })

  /** 重写db.json文件 */
  fs.writeFile("./db/db.json", JSON.stringify(newDB))
}

autoServer()

/** 启动json-server到9099（可监听接口变化） */
/** 注意：db.json路径根据实际修改 */
exec('json-server db/db.json --port 9099 --watch')

/** 启动json-server中间件服务到端口9090（可按需修改），实际数据从9099获取 */
server.listen(9090, () => {
  console.log('JSON-Server is Running')
})

/** 监听源数据，重写新数据 */
fs.watch('./db/origin_db.json', (curr, prev) => {
  autoServer()
})
