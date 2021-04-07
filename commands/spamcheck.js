module.exports = {
    name: "spam",
    description: "Selvittää spammataankö",
    execute(message, spammers, allUsers, limit, time){

        if(spammers.has(message.author.id)){
            let currentUser;
            for (let i = 0; i < allUsers.length; i++) {
                const element = allUsers[i];
                if(element[0] == message.author.id){
                    currentUser = element;
                }            
            }
    
            if(currentUser == null){
                // message.channel.send("bugi?");
            }
            else if(currentUser[1] >= limit){
                // message.channel.send("limit rikottu == ilmoitus");
                console.log(currentUser +" max");
                spammers.delete(message.author.id);
                return true;              
            }
            else{
                // message.channel.send("lisätty");
                currentUser[1] += 1;
                console.log(currentUser);
            }
        }
        else{
            spammers.add(message.author.id)
            // message.channel.send("eka lisätty"); 
            allUsers.push([message.author.id, 1])          
            console.log(message.author.username + " eka");
        }
    
        for (let i = 0; i < allUsers.length; i++) {
            const element = allUsers[i];
            if(element[1] > 0)
            {
                setTimeout(() => {
                    element[1] -= 1;
                    // message.channel.send(element[0] + " --- " + element[1] + "poistettu")
                    if(element[1] == 0){
                        var index = allUsers.indexOf(element);
                        allUsers.splice(index, 1)
                        spammers.delete(element[0])
                    }
                }, time)
            }
            
        }

    }
}
