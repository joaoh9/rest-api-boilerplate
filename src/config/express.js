const express = require('express')
const controllers = require('../api/routes')

const settings = require('./settings')

require('./database')()

module.exports = function () {
  const app = express();

  app.use(express.json())
  app.use('/v1/users', controllers.users.router)

  app.listen(settings.servicePort, () => {
    console.log(`Listening on port ${settings.servicePort}`)
  })
}