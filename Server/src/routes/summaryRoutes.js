const express = require('express')
const SummaryController = require('../controllers/summaryController')
const upload = require('../middleware/upload')
const SummaryRouter = express.Router()

SummaryRouter.post('/post-pdf',upload.single('pdf'), SummaryController)
SummaryRouter.get("/test", (req, res) => {
    res.send("Router works");
});

module.exports = SummaryRouter