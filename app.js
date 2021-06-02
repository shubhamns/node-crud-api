const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require("./routes/users")
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/testing', { useNewUrlParser: true }).then((res) => {
    console.log('connected')
}).catch((err) => {
    console.log('err', err)
});

app.use(bodyParser.json())

app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})