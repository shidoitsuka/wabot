const wa = require("@open-wa/wa-automate");
const fs = require("fs");
const prefix = "!";
const availableCommands = new Set();

fs.readdir("./commands", (e, files) => {
  if (e) return console.error(e);
  files.forEach((commandFile) => {
    availableCommands.add(commandFile.replace(".js", ""));
  });
});

wa.create().then((bot) => start(bot));

function start(bot) {
  bot.onMessage(async (msg) => {
    if (!msg.body.startsWith(prefix)) return;
    const args = msg.body.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (availableCommands.has(command))
      require(`./commands/${command}`).run(msg, bot, args);
  });
}
