const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('regex-alert-delete')
    .setDescription('Deletes one of your alerts')
    .addStringOption(option => option.setName('expression')
                                     .setDescription('Which expressions to delete')
                                     .setRequired(true)),
	async execute(interaction) {
    const uid = interaction.user.id;
    const todelete = interaction.options.getString('expression');
		const memory = interaction.client.memory.memory['alerts'];

		if (!memory || !memory[uid]) {
			interaction.reply('You have no alerts set!');
			return;
    }

		memory[uid] = memory[uid].filter(expression => expression !== todelete);
		interaction.client.memory.save();
		interaction.reply('Okay, I deleted that expression!');
		return;
	},
};
