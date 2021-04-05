module.exports = {
    name: "pahis",
    description: "Ilmoitus kielenkäytöstä",
    execute(message, Discord, client, ID){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Kielenkäyttö") 
        .setDescription(" **Liiallista rumaa kielenkäyttöä havaittu.** \n Käyttäjältä <@" +   message.author.id + "> \n Kanavalla <#" +  message.channel.id + "> \n [Siirry viestiin]("+message.url+") ")
        // .setThumbnail('attachment://warning.png')
        // .addFields(
        //     {name: "Esiintyviä merkkijonoja", value: "koodaan myöhemmin tän toimii"},
        // )
        .setThumbnail('https://cdn.discordapp.com/attachments/823946977003831296/824358409075294260/warning.png');


        client.channels.cache.get(ID).send(newEmbed)
    }
}