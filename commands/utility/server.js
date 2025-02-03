const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the server."),
    async execute(interaction) {
        await interaction.reply("This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.")
    }
}