const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    aliases: ['rollfi', 'init', 'rfi'],
	data: new SlashCommandBuilder()
		.setName('rollforinitiative')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Command to initialize'),
	async execute(interaction, args) {
        await interaction.reply({ content: 'This feature is in development. Come check back later!', ephemeral: true });
		return;
		let sectionName = "DnD"
		let channelName = "Create Session"
		interaction.reply({	content: `Roll for iniciative! 🎲\n
									  I will help you with the initialization proccess!
									  I will now create section named ${sectionName} and `, ephemeral: true });
									  
	},
};