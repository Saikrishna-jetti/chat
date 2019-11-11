import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
    providedIn : 'root'
})
export class MessageService {
    socket;
    constructor() {
        this.socket = io.connect();
    }
}
