const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    interaction.followUp({
      content: `0.${client.ws.ping.toString().slice(0, 3)} seconds.`,
    });
  },
};
