const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
function karma(karma) {
  if (karma < 5) return "Cell Helper";
  if (karma >= 5 && karma < 10) return "Insect Helper";
  if (karma >= 10 && karma < 25) return "Animal Helper";
  if (karma >= 25 && karma < 50) return "Human helper";
  if (karma >= 50) return "God Helper";
}
karma.next = (km) => {
  let status = karma(km);
  let ch = "Cell Helper";
  let ih = "Insect Helper";
  let ah = "Animal Helper";
  let hh = "Human Helper";
  let gh = "God Helper";
  if (status === ch) return ih;
  if (status === ih) return ah;
  if (status === ah) return hh;
  if (status === hh) return gh;
  if (status === gh) return "None";
};
const usermodel = require("../../models/User");
module.exports = {
  name: "money",
  description: "Money related commands.",
  type: "CHAT_INPUT",
  guild: true,
  options: [
    {
      type: "SUB_COMMAND",
      name: "balance",
      description: "View the balance of a user.",
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to view the balance of.",
          required: false,
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {*} args
   */
  run: async (client, interaction, args) => {
    if (args[0] === "balance") {
      let user = await interaction.guild.members.fetch({
        user: args[1] || interaction.user.id,
      });
      let model = await usermodel.findOne({ User: user.id });

      const embed = new MessageEmbed()
        .setAuthor({
          name: `${user.user.tag}`,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `> Balance\n${model.Money.toString()}$\n> Karma\n${
            model.Karma
          } Karma | (${karma(model.Karma)} | Next: ${karma.next(model.Karma)})`
        );
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
