const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/epicchat', {useNewUrlParser: true , useUnifiedTopology : true})
        .then('Connnected DB')
        .catch('Database not connected');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'../dist/index.html'))
});

app.listen(3000, () => console.log('Listening on port 3000..'));