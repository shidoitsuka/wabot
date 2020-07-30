exports.run = (msg, bot) => {
    bot.sendText(msg.from, "🏓 | Pong!");
}

exports.help = {
    name: "Ping",
    description: "Check if I'm active!",
    usage: "ping",
    cooldown: 15
}