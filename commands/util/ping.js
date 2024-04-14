const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    aliases: ['uwu'],
	data: new SlashCommandBuilder()
		.setName('ping')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Replies with Pong!'),
	async execute(interaction, cmdName) {
        if (cmdName == 'uwu') {
            await interaction.reply('OwO!');
            return;
        }
		await interaction.reply('Pong!');
	},
};