// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./auth.json');

const memory = require('./utils/memory.js');

setInterval(memory.save, 1000 * 60);

// Create a new client instance with the right permissions
const client = new Client({ intents: [Intents.FLAGS.GUILDS,
																			Intents.FLAGS.GUILD_MESSAGES] });
// Add data to the client object
client.commands = new Collection();
client.parsers = [];

const commandFiles = fs.readdirSync('./commands')
													.filter(file => file.endsWith('.js'));
const parserFiles = fs.readdirSync('./parsers')
													.filter(file => file.endsWith('.js'));

// Add commands to the Collection, with the command name as key,
// and value as the exported module.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Add parsers to the parser list
// No need for names, since we pass a message through all parsers.
// (Or maybe we should stop after the first parser?)
for (const file of parserFiles) {
	const { parse } = require(`./parsers/${file}`);
	client.parsers.push(parse);
}

client.memory = memory;

// When the client is ready, run this code (only once)
client.once('ready', () => { console.log('Ready!'); });

// Test the execution of slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Parse the messages the bot sees in the servers.
client.on('messageCreate', message => {
	// Do not parse messages created by the bot
	if (message.author.bot) return;

	for (const i in client.parsers) {
		client.parsers[i](message);
	}

});

// Login to Discord with your client's token
client.login(token);
