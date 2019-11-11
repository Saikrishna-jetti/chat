const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/epicchat' ,{useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist')));

const Message = require('./models/message');

app.get('/api/chat', (req,res) =>{
    Message.find({}).then(rec => {
        if(rec) {
            res.send(rec);
        } else {
            res.send([]);
        }
    });
});

app.post('/api/chat', (req,res) =>{
    const newMessage = new Message({
        __id: mongoose.Types.ObjectId(),
        message: req.body.message,
        user:'user'
    });
    Message.save().then(rec => {
        if(rec) {
            res.send(rec);
        } else {
            res.send([]);
        }
    });
});


app.listen(3000, () => console.log('Listening on port 3000..'));