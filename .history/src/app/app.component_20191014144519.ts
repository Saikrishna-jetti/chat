import { Component } from '@angular/core';

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
    addChat(){
      if(this.message.length === 0)
      {
          return;
      }
      this.chats.push(this.message);
    }
}
