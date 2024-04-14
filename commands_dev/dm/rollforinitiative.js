const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    aliases: ['rollfi', 'init', 'rfi'],
	data: new SlashCommandBuilder()
		.setName('rollforinitiative')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Command to initialize'),
	async execute(interaction, cmdName) {
        interaction.reply({ content: 'This feature is in development. Come check back later!', ephemeral: true });
        return;
	},
};