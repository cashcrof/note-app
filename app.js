const express = require("express");
const mysqlDatabase = require('./mysqlDatabase')


const app = express();

app.set("view engine", "ejs") 
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
  const notes = await mysqlDatabase.getNotes().then(function(result){
    return result;
  });
  res.render("index.ejs", {"notes" : notes})
})

// app.get("/notes/:id", async (req, res) => {
//   const id = req.params.id
//   try {
//     const note = await mysqlDatabase.getNote(id)
//     res.send(note)
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// })


app.post("/create-note", (req, res) => {
  const {title, contents} = req.body;
  mysqlDatabase.addNote(title, contents)
  res.redirect("/")
})

app.post("/delete", async (req, res) => {
  await mysqlDatabase.deleteNote(req.body.id);
  res.redirect("/")
})

app.use(express.static("public"))


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});