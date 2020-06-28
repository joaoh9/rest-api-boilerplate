const express = require('express')
const controllers = require('./api/routes')

require('./mongose')()

const app = express();

app.use(express.json())
app.use('/v1/users', controllers.users.router)

app.listen(3000, () => {
  console.log('Listening on por 3000')
})