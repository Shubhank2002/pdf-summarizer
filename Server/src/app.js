require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const SummaryRouter = require('./routes/summaryRoutes')

app.use(express.json())
app.use(cors())
app.use('/api',SummaryRouter)

module.exports = app