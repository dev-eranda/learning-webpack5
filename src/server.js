const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.use('/static', express.static(path.resolve(__dirname, '../dist'))) // get static file to server [*.js *.css

app.get('/', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
    res.send(contentFromHtmlFile)
})

app.get('/kiwi', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi.html')
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
    res.send(contentFromHtmlFile)
})

app.listen(3000, function () {
    console.log(`Application running on port 3000: http://localhost:3000`);
})