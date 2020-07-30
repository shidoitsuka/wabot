const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (msg, bot) => {
    if (msg.quotedMsgObj == null || msg.quotedMsgObj.type != "image") return bot.sendText(msg.from, "Please quote a picture!");
    const waiting = await bot.sendText(msg.from, "*Generating...*");
    const media = await decryptMedia(msg.quotedMsgObj, uaOverride);
    bot.sendImageAsSticker(msg.from, `data:image/jpeg;base64,${media.toString('base64')}`).then((_) => {
        bot.deleteMessage(msg.from, waiting);
    });
}

exports.help = {
    name: "Sticker",
    description: "Stickerify a picture!",
    usage: "sticker",
    cooldown: 15
}