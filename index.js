const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { REST, Routes, GuildMember } = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { appID, guildID, token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [0b111111111111111111111] });



//------------------------- Slash Commands -------------------------

client.commands = new Collection();
const commands = [];
const commandsDev = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const foldersPathDev = path.join(__dirname, 'commands_dev');
const commandFoldersDev = fs.readdirSync(foldersPathDev);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);

            let cmdLog = `Registred: ${file} as ${command.data.name}`;

            for (let alias of command.aliases) {
                client.commands.set(alias, command);
                cmdLog += `, ${alias}`;
            }

            console.log(cmdLog);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            //DEBUG
            //console.log(`${command.data} / ${command.execute}`);
            //console.log(`${commandsPath} / ${filePath}`);
            //console.log(`${command} if: ${'data' in command} ${'execute' in command}`)
		}
	}
}

// These commands will deploy only on selected server
for (const folder of commandFoldersDev) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPathDev, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commandsDev.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
           
            let cmdLog = `Registred for development: ${file} as ${command.data.name}`;

            for (let alias of command.aliases) {
                client.commands.set(alias, command);
                cmdLog += `, ${alias}`;
            }

            console.log(cmdLog);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            //DEBUG
            //console.log(`${command.data} / ${command.execute}`);
            //console.log(`${commandsPath} / ${filePath}`);
            //console.log(`${command} if: ${'data' in command} ${'execute' in command}`)
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
        // Dev Deployment
		console.log(`Started refreshing ${commandsDev.length} application (/) commands in development.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const dataDev = await rest.put(
			Routes.applicationGuildCommands(appID, guildID),
			{ body: commandsDev },
		);

		console.log(`Successfully reloaded ${dataDev.length} application (/) commands in development.`);

        // All Server Deployment
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(appID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

//----------------------- END Slash Commands -----------------------



// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Slash Command Handling
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) console.log(interaction.command);
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction, interaction.commandName);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.on(Events.MessageCreate, async message => {
    // Command conditions
    if (message.author.bot) return;

    console.log(message.member.permissions)

    let args = message.content.toLowerCase().split(' ');
    const command = message.client.commands.get(args[0]);

    if (!command) {
		console.error(`No command matching ${args[0]} was found.`);
		return;
	}

    /*if (!message.member.permissions.has(command.default_memeber_permissions)) {
        message.reply(`You dont have enough permissions!`)
    }*/

    // Command Execution
	try {
		await command.execute(message, args[0]);
	} catch (error) {
		console.error(error);
		if (message.replied || message.deferred) {
			await message.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token
client.login(token);