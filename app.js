const express = require("express")
const cors = require("cors")
const logger = require("morgan")
const routes = require("./routes")

const app = express()

// app.use(cors({origin: "https://6296a2cfcac1020009154ca8--adorable-axolotl-f72454.netlify.app/"}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(logger("dev"))

app.use("/api", routes)



module.exports = app