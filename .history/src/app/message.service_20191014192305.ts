import { Injectable } from "@angular/forms";
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