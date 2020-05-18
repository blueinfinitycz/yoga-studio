const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const loginRoute = require('./api/routes/login')
const menuRoute =  require('./api/routes/menu')
const dashboardRoute =  require('./api/routes/dashboard')
const eventsRoute =  require('./api/routes/events')
const prashadRoute =  require('./api/routes/prashad')
const contactsRoute =  require('./api/routes/contacts')

app.use('/', loginRoute)
app.use('/', menuRoute)
app.use('/', dashboardRoute)
app.use('/', eventsRoute)
app.use('/', prashadRoute)
app.use('/', contactsRoute)



const server = app.listen(3001,() => {
    const {port} = server.address()
    console.log('server localhost running at port: ', port)
})