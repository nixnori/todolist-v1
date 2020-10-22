const express = require("express")
const bodyParser = require("body-parser")
const { static } = require("express")

const app = express()

let items = []
let workItems = []

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {

    let today = new Date()
   
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options)
    

    res.render("list", {listTitle: day, newItems: items})
})

app.post("/", (req, res) => {

    console.log(req.body)

    let item = req.body.newListItem

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }

    res.redirect("/")
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newItems: workItems})
})

app.listen(3000, () => {
    console.log("Server running on port 3000.")
})