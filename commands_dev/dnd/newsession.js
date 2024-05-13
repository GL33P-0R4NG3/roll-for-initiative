const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('newsession')
        //.setDescriptionLocalization('cs', 'Tak ty si kokot!')
		.setDescription('Creates new session for the user'),
        //.setDefaultMemberPermissions(0),
	async execute(interaction, args) {
		await interaction.reply({ content: 'This feature is in development. Come check back later!', ephemeral: true });
        return;

	},
};