const express = require("express")
const server = express()

//config pasta public
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//caminhos da app
//home
//req = requisição
//res = resposta
server.get("/", (req, res) =>{
  return res.render("index.html", { title: "Seu marketplace de coleta de residuos" })
})
//res.render(__dirname + "/views/create_point.html")
server.get("/create_point", (req, res) =>{
  return res.render("create_point.html")
})

server.get("/search", (req, res) =>{
  return res.render("search.html")
})

//ligar servidor
server.listen(3000)