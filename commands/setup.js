module.exports = {
    name: "setup",
    description: "Palauttaa kanavan",
    execute(message, args, Discord){
        message.channel.send(":white_check_mark: **Ilmoitukset suunnataan nyt tälle kanavalle.**");
        return message.channel.id;
    }
}