const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('regex-alert-list')
    .setDescription('List your regex-alerts'),
	async execute(interaction) {
    const uid = interaction.user.id;
    const memory = interaction.client.memory.memory['alerts'];

    if (!memory || !memory[uid]) {
			interaction.reply('You have no alerts set!');
    }
		else {
			interaction.reply('Your alerts are ' + memory[uid]);
    }
		return;

	},
};
