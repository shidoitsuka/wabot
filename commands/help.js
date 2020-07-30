const { readdir } = require("fs");

exports.run = (msg, bot, args) => {
  // working on this one
  let tmpFile = {};
  readdir("./commands/", (e, files) => {
    if (e) console.error(e);
    files.forEach((jsFile) => {
      const cmdFile = require(`./${jsFile}`);
      tmpFile[jsFile.replace(".js", "")] = {};
      tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
      tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
      tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
    });
    if (!args[0]) {
      // prettier-ignore
      bot.sendText(msg.from, `Available commands : ${Object.keys(tmpFile).join(", ")}\n\nYou can run *_help <command name>* to show advanced help._`);
    } else {
      const commandName = args[0];
      const { name, description, usage } = require(`./${commandName}.js`).help;
      bot.sendText(msg.from, `*${name}*\n\nDescription : ${description}\nUsage : ${usage}`);
    }
  });
};

exports.help = {
  name: "Help",
  description: "Show this",
  usage: "help",
  cooldown: 15,
};
