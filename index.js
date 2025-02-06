// Require the necessary discord.js classes
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const connectDB = require('./db');
const Event = require('./models/events');



connectDB();
// Create a new client instance

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,],
});


client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on('messageCreate', async message => {

	//Ignore messages from bots or those that do not start with !
	if ((message.author.bot) || !message.content.startsWith('!')) return;

	const args = message.content.slice(1).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();



	const command = client.commands.get(commandName)
	if (!command) return

	try {
		await command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error with the command.')
	}
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId.startsWith('accept-')) {

		const eventId = interaction.customId.split('-')[1]

		try {
			const event = await Event.findById(eventId)
			if(!event) return interaction.reply({content: 'Event does not exist.', ephemeral: true})

			if(!event.participants.includes(interaction.user.username)) {
				event.participants.push(interaction.user.username)
				await event.save()
			}
			await interaction.reply({ content: `${interaction.user.username} accepted the event!`, ephemeral: true })
		} catch (error) {
			console.error(error)
			await interaction.reply({ content: 'There was an error', ephemeral:true})
		}
		
	}
})

// Log in to Discord with your client's token
client.login(token);

