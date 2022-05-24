const client = require("../index");
const usermodel = require("../models/User");
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let mentionedUserData = await usermodel.findOne({
    User: message.mentions.users.first().id,
  });
  if (!mentionedUserData) {
    mentionedUserData = new usermodel({
      User: message.mentions.users.first().id,
    });
  }
  const incl = message.content.toLowerCase();
  if (
    (incl.includes("thank") || incl.includes("tnx") || incl.includes("thx")) &&
    message.mentions.users.first()
  ) {
    mentionedUserData.Karma += 2;
    mentionedUserData.save((err) => {
      if (err) console.error(err);
    });
    await message.reply(
      `2 Karma added to ${message.mentions.users.first().tag} by ${
        message.author.tag
      }`
    );
  }
  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args);
});
