const express = require('express')
const controllers = require('./api/routes')

const settings = require('./config')

require('./mongose')()

const app = express();

app.use(express.json())
app.use('/v1/users', controllers.users.router)

app.listen(settings.db.port, () => {
  console.log(`Listening on port ${settings.db.port}`)
})