const express = require('express')
const controllers = require('./api/routes')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tech-vogel', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('Mongo connected at mongodb://localhost/tech-vogel')
})

mongoose.connection.on('error', error => {
  console.log('Mongoose error' + error)
})

const app = express();

app.use(express.json())
app.use('/v1/users', controllers.users.router)

app.listen(3000, () => {
  console.log('Listening on por 3000')
})