const { time } = require("console");
const Discord = require("discord.js");

const client = new Discord.Client();

//alkumerkki
const prefix = "<@!823627594741841932>"; 
const prefix2 = "<@823627594741841932>"; 


let channelID = "656580335991259155";

const reportedSpammers = new Set();
const spammers = new Set()
let allUsers = [];

const reportatutPahikset = new Set();
const pahikset = new Set()
let kiroilijaLista = [];

const reportIngore = 60000;

let clock = new Date();

//jotain selvitän myöhemmin, ilmeisesti etsitään kansiosta js filejä ja pistetään commandFiles variableen
const fs = require("fs");
const { stringify } = require("querystring");
const { setTimeout } = require("timers");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}


//testi et se on hereil
client.once("ready", () => {
    console.log("moi");
});

let kirosanat = [];
fs.readFile('sanat.txt', 'utf-8', (err, data) => {
    if (err) throw err;
  
    kirosanat = data.split(/, +/);
})


//jokaista messagea kohden
client.on("message", message => {

    if(message.author.bot) return;


    //spam
    if(!reportedSpammers.has(message.author.id)){
        if(client.commands.get("spam").execute(message, spammers, allUsers, 4, 15000)){
            client.commands.get("spamEmbed").execute(message, Discord, client, channelID);

            reportedSpammers.add(message.author.id)
            setTimeout(() => {
                reportedSpammers.delete(message.author.id)
            }, reportIngore);
        }
    }

    let sanat = message.content.toLowerCase();
    //kielenkäyttö
    while (true)
    {
        let breaking;
        for (let index = 0; index < kirosanat.length; index++) {
            const kirosana = kirosanat[index];
            if(sanat.includes(kirosana)){
                let kohta = sanat.indexOf(kirosana);
                sanat = sanat.slice(kohta + kirosana.length);
                // console.log(sanat);
                if(!reportatutPahikset.has(message.author.id)){
                    if(client.commands.get("spam").execute(message, pahikset, kiroilijaLista, 5, 300000)){
                        client.commands.get("pahis").execute(message, Discord, client, channelID);
                        kiroilijaLista = []
                        reportatutPahikset.add(message.author.id)
                        setTimeout(() => {
                        reportatutPahikset.delete(message.author.id)
                        }, reportIngore);
                    }
                }
                
            }
        }
        breaking = true;
        for (let index = 0; index < kirosanat.length; index++) {
            const kirosana = kirosanat[index];
            if(sanat.includes(kirosana)){
                breaking = false;
            }
        }
        if(breaking)
        {
            break;
        }

    }


    

    //mainos
    if(message.content.includes("https://discord.gg/")){
        client.commands.get("ad").execute(message, Discord, client, channelID);
    }
    if(message.content.includes("raatomiitti" || "saatiomiitti" || "miitti")){
        client.commands.get("miitti").execute(message, Discord, client, channelID);
    }
    //jos ei ala prefixil tai ole botin
    if(message.content.startsWith(prefix2)){
        prefix = prefix2;
    }

    if(!message.content.startsWith(prefix)) return;

    //välilyönnit osiin ja pikkukirjaimiks
    const args = message.content.slice(prefix.length + 1).split(/ +/);
    const command = args.shift().toLowerCase();



    //komennot
    // if(command === "moi"){
    //     client.commands.get("eka").execute(message,args, Discord);
    // } else if(command == "jaa"){
    //     client.commands.get("embed").execute(message,args, Discord);
    if(command == "setup"){
        console.log("setup");
        channelID = client.commands.get("setup").execute(message,args, Discord);
    } else if(command == "kello"){
        console.log(clock.getTime()); 
    // } else if(command == "suoraspam"){
    //     client.commands.get("spamEmbed").execute(message, Discord, client, channelID);
    // }
    }
    
    
})


client.login(process.env.token);
