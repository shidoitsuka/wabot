const { readdir } = require("fs")

exports.run = (msg, bot) => {
    // working on this one
    let tmpMessage = [];
    readdir("./commands/", (e, files) => {
        console.log(files)
        if (e) console.error(e);
        console.log(files)
        console.log("files")
        files.forEach(jsFile => {
            console.log(jsFile);
            console.log("jsFile")
            const cmdFile = require(`./${jsFile}`);
            let tmpFile = {};
            tmpFile[jsFile.replace(".js", "")] = {};
            tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
            tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
            tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
            tmpMessage.push(tmpFile);
            console.log(tmpFile);
        });
        console.log(tmpMessage);
    });
}

exports.help = {
    name: "Help",
    description: "Show this",
    usage: "help",
    cooldown: 15
}