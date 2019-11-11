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
    _chatssub: Subject<any[]>;
    socket: { on: { (arg0: string, arg1: () => void): void; (arg0: string, arg1: (data: any) => void): void; (arg0: string, arg1: (data: any) => void): void; }; emit: { (arg0: string, arg1: string): void; (arg0: string, arg1: any): void; (arg0: string, arg1: any): void; }; };
    constructor() {
        this._chatssub = new Subject<any[]>();
        this.socket = io.connect();
        this.socket.on('connect', () => {
            console.log('connected to the server');
        });
        this.socket.emit('new message', 'hey');
        this.socket.on('message recieved', (data: any) => {
            this._chats.push(data);
            this._chatssub.next([...this._chats]);
        });

        this.socket.on('all messages', (data: any) => {
            this._chats = [...data];
            this._chatssub.next([...this._chats]);
        });
    }
    addChat(message: string) {
        this.socket.emit('new message', message);
    }
    addUser(user: any) {
        this.socket.emit('new user', user);
    }
    getChats() {
        return this._chatssub.asObservable();
    }
}
