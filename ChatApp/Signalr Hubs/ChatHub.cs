
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Internal;
using System.IO;
using System.Text.Json;

namespace ChatApp.Signalr_Hubs
{
    class X {

    public   static string GetRes(string message) {
            string res = "Sorry, I didn't get that";
            try
            {
                string? text = File.ReadAllText(path: "./Data/ChatData.json");

                var json = JsonSerializer.Deserialize<dynamic>(text);
                List<ChatDataItem> chatDataItems = JsonSerializer.Deserialize<List<ChatDataItem>>(text);


                foreach (ChatDataItem chatDataItem in chatDataItems)
                {
                    if (chatDataItem.massage.Contains(message.ToLower()))
                    {
                        Random rn =new Random();
                       
                        res = chatDataItem.response[rn.Next(0, chatDataItem.response.Count)];
                        break;
                    }


                }
            }
            catch (Exception e) { res = "Sorry, I didn't get that" ;}

            return res;
        }
    }
    public class ChatHub : Hub
    {



        public async Task sendMessage(string message)
        {
          var res=  X.GetRes(message);


           await Clients.Caller.SendAsync("receiveMessage", res);
        }
     
        


    }

    class ChatDataItem
    {
        public List<string> massage { get; set; }

        public List<string> response { get; set; } 
    }

}

