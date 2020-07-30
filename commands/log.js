exports.run = (msg, bot) => {
    bot.sendText(msg.from, "Test").then(m => {
        console.log(msg);
        bot.deleteMessage(msg.from, m);
    });
}

exports.help = {
    name: "Log",
    description: "Owner Only",
    usage: "log",
    cooldown: 1
}