const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Message = require('./models/message');
const server = require('http').Server(app);
const io = require('socket.io')(server);

// database connection
mongoose.connect('mongodb://localhost:27017/epicchat' ,{useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist')));


//io socket connections
    io.on('connection', (socket) => {
        let user = '';

        console.log("new user connected");
        socket.on('new message', (data) =>{
            socket.emit('message recieved', 'data from the server')
            const newMessage = new Message({
                __id: mongoose.Types.ObjectId(),
                message: data,
                user:user
            });
            newMessage.save().then(rec => {
                if(rec) {
                    socket.emit('message recieved', rec);
                } else {
                    res.send([]);
                }
            });

        });
        socket.on('new user', (data) =>{
            user = user;
            console.log('new user connected');
            Message.find({}).then(rec => {
                if(rec) {
                    socket.emit('all message', rec);
                } else {
                    
                }
        });
       });
    });

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


server.listen(3000, () => console.log('Listening on port 3000..'));