const express = require("express")
const server = express();

const db = require("./database/db")

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
   express: server,
   noCache: true
})

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

server.get("/", (req, res) => {
   return res.render("index.html")
})

server.get("/create-point", (req, res) => {

   return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
   console.log(req.body)

   const query = `
        INSERT INTO places (
        image ,
        name ,
        address ,
        address2 ,
        state ,
        city ,
        items 
    ) VALUES (
        ?,?,?,?,?,?,?
    )
`;

   const values = [
      req.body.image,
      req.body.name,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.items
   ];

   function afterInsertDate(err) {
      if (err) {
          console.log(err)
          return res.send("Erro no cadastro");
      }
      console.log("Cadastrado com sucesso")
      return res.render("create-point.html",{saved : true})
   }
   db.run(query, values, afterInsertDate)

})

server.get("/search", (req, res) => {

   const search = req.query.search;

   if(search == ""){
      return res.render("search-result.html", {total:0})
   }
   db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
      if (err) {
         return console.log(err)
      }
      console.log("aqui estão seus registros");
      console.log(rows)
      const total = rows.length;
      return res.render("search-result.html", { places: rows, total })
   })

})


var porta = process.env.PORT || 8080;
server.listen(porta)