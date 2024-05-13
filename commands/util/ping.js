const { SlashCommandBuilder } = require('discord.js');

const replies = [   'OwO!',
                    'OwO',
                    'owo!',
                    'owo',
                    'UwU!',
                    'UwU',
                    'uwu!',
                    'uwu',
                    'yiff',
                    //'Roll for iniciative! 🎲'
                ]

module.exports = {
    aliases: ['uwu'],
	data: new SlashCommandBuilder()
		.setName('ping')
        //.setDescriptionLocalization('cs', 'Odpoví Pong')
		.setDescription('Replies with Pong!'),
	async execute(interaction, args) {
        if (args[0] == 'uwu') {
            await interaction.reply(replies[Math.round(Math.random() * (replies.length - 1))]);
            return;
        }
		await interaction.reply('Pong!');
	},
};