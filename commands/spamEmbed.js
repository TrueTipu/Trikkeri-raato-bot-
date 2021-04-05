module.exports = {
    name: "spamEmbed",
    description: "Ilmoitus spämmistä",
    execute(message, Discord, client, ID){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FF7800")
        .setTitle("Spämmi") 
        .setDescription(" **Liiallista spämmiä havaittu.** \n Käyttäjältä <@" +   message.author.id + "> \n Kanavalla <#" +  message.channel.id + "> \n [Siirry viestiin]("+message.url+") ")
        //setThumbnail('attachment://warning.png');
        .setThumbnail('https://cdn.discordapp.com/attachments/823946977003831296/824358409075294260/warning.png');


        client.channels.cache.get(ID).send(newEmbed)
    }
}