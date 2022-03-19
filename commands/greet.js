const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('greet')
		.setDescription('Greets the bot, get a random greeting back!'),
	async execute(interaction) {
		await interaction.reply(getGreeting());
	},
};


function getGreeting() {
  return 'Hi';
}
