import { transition, trigger,state, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
  animations: [trigger("fade",
    [
      transition("void=>*", [style({ opacity: 0.3  }), animate("2s ease-in-out")])
    ]

 )]
})
export class ChatPageComponent implements OnInit {

  constructor(public messageService: MessagesService) {  }

  ngOnInit(): void {
    this.messageService.connect();
  }

  msg = "";
  grp = "";
  addGroup() {
    this.messageService.buildGroupMessage(this.grp);
  }
  sengGroupMessage() {
    this.messageService.sendMassageToGroup(this.msg, this.grp);
    this.msg = "";
  }
  sendMsg() {

    if (this.messageService.isConnected() == true) {
      if (this.msg!="") {
        this.messageService.sendMassageToServer(this.msg);
        this.messageService.messagesList.push({ isMe: true, text: this.msg });
      }
      } else {
      window.alert("Bot is loading ..please wait");
    }
  }
}
