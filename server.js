import express from "express";
import { fetch_ipc }  from './functions/main.js'

const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))

const port = process.env.PORT || 8080
const backlog = () => {
  console.log(`Running at http://localhost:${port}`)
}

server.get('/',(req,res) => {
  	fetch_ipc(res)
})

server.use('/*', express.static('public/html/error.html'))

server.listen(port, backlog)
