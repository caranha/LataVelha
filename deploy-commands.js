const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guildId } = require('./config.json');
const { clientId, token } = require('./auth.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const args = process.argv.slice(2);

const rest = new REST({ version: '9' }).setToken(token);

if (args[0] === 'global') {
	console.log('Deploying Commands Globally.');
	// Global Commands
	rest.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}
else {
	console.log('Deploying Commands Locally.');
	console.log('Use "global" do deploy them globally');
	// Local Commands
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}
