import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';


@Injectable({
    providedIn : 'root'
})
export class MessageService {
    // tslint:disable-next-line:variable-name
    _chats = [];
    // tslint:disable-next-line:variable-name
    _chatssub;
    socket;
    constructor() {
        this._chatssub = new Subject<any[]>();
        this.socket = io.connect();
        this.socket.on('connect', () => {
            console.log('connected to the server');
        });
        this.socket.emit('new message', 'hey');
        this.socket.on('message recieved', (data) => {
            this._chats.push(data);
            this._chatssub.next([...this._chats]);
        });

        this.socket.on('all messages', (data) => {
            this._chats = [...data];
            this._chatssub.next([...this._chats]);
        });
    }
    addChat(message) {
        this.socket.emit('new message', message);
    }
    addUser(username) {
        this.socket.emit('new user', username;
    }
    getChats() {
        return this._chatssub.asObservable();
    }
}
