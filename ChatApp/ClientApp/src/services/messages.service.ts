import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesList: message[] = [];
  typing = false;
  constructor(private http: HttpClient) { }

 



  con = new signalr.HubConnectionBuilder()
    .withUrl("https://localhost:7001/chat")
    .configureLogging(signalr.LogLevel.Information)
      .build();


  sendMassageToServer(mssg: string)
  {
 
    //this.http.post("https://localhost:7001/api/messages", { "msg": mssg }).subscribe();
    this.con.invoke("sendMessage", mssg)
      .then(() => { console.log("Messaage Sent") })
      .catch((e) => { window.alert("- Failed to send Message" + e) });

  }

  buildGroupMessage(name: string) {

    //this.http.post("https://localhost:7001/api/messages", { "msg": mssg }).subscribe();
    this.con.invoke("buildGroupMessage", name)
      .then(() => { console.log("Group Created") })
      .catch((e) => { window.alert("- Failed to Create Group" + e) });

  }


  sendMassageToGroup(msg: string, groupName:string) {

    //this.http.post("https://localhost:7001/api/messages", { "msg": mssg }).subscribe();
    this.con.invoke("sendGroupMessage", msg ,groupName)
      .then(() => { console.log("Messaage Sent To Group") })
      .catch((e) => { window.alert("- Failed to send Message to Group" + e) });

  }

  isConnected(): boolean
  {

    if (this.con.state == signalr.HubConnectionState.Connected) {
      return true;
    }
    return false;
  }


  connect() {
   

    this.con.start()
      .then(() => {
        console.log("Client:SignalR Connection Started");
        this.messagesList.push({ isMe: false, text: "This is Lexa bot here for chatting you ,How are you?" });
        this.typing = false;
      })
      .catch(() => { console.log("Client:SignalR Connection Failed") });
    this.con.onreconnected((conid) => console.log(">> "+conid))
    this.con.on(
      "receiveMessage",
      (msg) => {
        this.typing = true;

        setTimeout(() => {
          this.messagesList.push({ isMe: false, text:msg });
          this.typing = false;

        }, 2000)
   

      }

    );

    

  }






}



export interface message {
  text: string;
  isMe: boolean;

}
