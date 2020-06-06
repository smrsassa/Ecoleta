const express = require("express")
const server = express()

//banco
const db = require("./database/db")

//config pasta public
server.use(express.static("public"))

//habilita req.body
server.use(express.urlencoded({extended: true}))

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

server.post("/save-point", (req, res) =>{
  const query = `INSERT INTO places (
                image, name, address, address2, state, city, items
                ) 
                VALUES (
                  ?, ?, ?, ?, ?, ?, ?
                );`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.itens
  ]

  function afterInsertData(err) {
    if ( err ) {
      return console.log(err)
    }

    console.log(this)

    return res.render("create_point.html", { saved:true })
  }

  console.log(req.body)
  db.run(query, values, afterInsertData)

})


server.get("/search", (req, res) =>{

  const search = req.query.search

  if ( search == "" ) {
    return res.render("search.html", { total: 0 } )
  }

  //pegar os dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if ( err ) {
      console.log(err)
      return res.send("Erro no cadastro")
    }

    const total = rows.length

    return res.render("search.html", { places: rows, total: total } )
  })
})

//ligar servidor
server.listen(3000)