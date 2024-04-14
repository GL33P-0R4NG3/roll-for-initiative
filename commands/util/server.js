const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('server')
        .setDescriptionLocalization('cs', 'Tak ty si kokot!')
		.setDescription('Provides information about the server.'),
        //.setDefaultMemberPermissions(0),
	async execute(interaction, cmdName) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};