const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const linkRoute = require('./routes/linkRoute')

const PORT = 3000

mongoose.connect('mongodb://localhost/newLinks')

let db = mongoose.connection

db.on('error', () => console.log('Houve um erro'))
db.once("open", () => { console.log('Banco carregado') })

app.set("view engine", 'ejs')
app.set("views", path.join(__dirname, 'templates'))

app.use('/', linkRoute)

app.listen(PORT)