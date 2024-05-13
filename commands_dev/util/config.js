const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    aliases: ['settings'],
	data: new SlashCommandBuilder()
		.setName('config')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Replies with Pong!'),
	async execute(interaction, args) {
		await interaction.reply('Pong!');
	},
};