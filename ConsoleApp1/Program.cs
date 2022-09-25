// See https://aka.ms/new-console-template for more information

using System.IO;
using System.Text.Json;
string? text = File.ReadAllText(path: "../../../Data/ChatData.json");
 List<ChatDataItem> chatDataItems = JsonSerializer.Deserialize<List<ChatDataItem>>(text);


while (true)
{
    var input = Console.ReadLine();
    string res = "";
    foreach (ChatDataItem chatDataItem in chatDataItems)
    {
        if (chatDataItem.massage.Contains(input))
        {
            res = chatDataItem.response[0];
            break;
        }
    }
    Console.WriteLine(res);
}



Console.ReadLine();

class ChatDataItem
{
    public List<string> massage { get; set; }

    public List<string> response { get; set; }
}