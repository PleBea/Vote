const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express()

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/vote/:id', (req,res)=> {
    const id = req.params.id
    fs.readFile('./config.json', 'utf-8' ,(err,data) => {
        if (!err) {
            data = JSON.parse(data)
            data.vote[id]++;
            const returnJSON = JSON.stringify(data)
            fs.writeFileSync('./config.json', returnJSON)
        } else {
            console.log(err)
        }
    })
    res.redirect('/')
}) 

app.listen(3000, () => {
    console.log('http://localhost:3000')
})