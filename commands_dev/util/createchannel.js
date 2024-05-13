const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    aliases: [],
	data: new SlashCommandBuilder()
	    .setName('channel')
		.setDescription('Command for operating with channels!')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
        .addSubcommand(sub => 
            sub
            .setName('new')
            .setDescription('Create new channel.')
            .addStringOption(str => 
                str
                .setName('name')
                .setRequired(false)
                .setDescription('Name of new channel.')
            )
            /* .addMentionableOption(mention =>
                mention
                .setName('mentionable')
                .setRequired(false)
                .setDescription('Member or role to ')  //TODO: edit
            ) */
        )
        .addSubcommand(sub => 
            sub
            .setName('delete')
            .setDescription('Deleting choosen channel/s.')
            .addChannelOption(chnl => 
                chnl
                .setName('channel')
                .setRequired(true)
                .setDescription('Mention for the channel to delete.')
            )
        ),
	async execute(interaction, args) {
        
		await interaction.reply('Pong!');
	},
};