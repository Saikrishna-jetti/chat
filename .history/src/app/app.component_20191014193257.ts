import { Component } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Epic Chat';
  message = '';
  chats = [
    'hi how r u',
    'am fine',
    'am good',
    'who are you',
    'hey am fine',
    'now ready'
  ];
  constructor(message: MessageService) {

  }
    addChat()  {
      if (this.message.length === 0) {
          return;
      }
      this.chats.push(this.message);
      this.message = '';
      window.setInterval(() => {
        const elem = document.getElementById('scrolldiv');
        elem.scrollTop = elem.scrollHeight;
      }, 500);
    }
}
