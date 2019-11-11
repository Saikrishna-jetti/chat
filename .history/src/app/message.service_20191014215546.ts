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
            console.log(data);
        });

        this.socket.on('all messages', (data) => {
            this._chats = [...data];
            this._chatssub.next([...this._chats]);
        });
    }
    addChat(message) {
        this.socket.emit('new message', message);
    }
    getChats() {
        return this._chatssub.asObservable();
    }
}
