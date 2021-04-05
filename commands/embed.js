module.exports = {
    name: "embed",
    description: "testailen vaan",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("kusetus")
        .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        .setDescription("nyt osaan")
        .addFields(
            {name: "rivi1", value: "joo"},
            {name: "rivi2", value: "ei"}
        )
        .setFooter("En ees tiedä");

        message.channel.send(newEmbed)
    }
}