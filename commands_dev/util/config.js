const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    aliases: ['settings'],
	data: new SlashCommandBuilder()
		.setName('config')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Replies with Pong!'),
	async execute(interaction, cmdName) {
		await interaction.reply('Pong!');
	},
};