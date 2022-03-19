const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('servechannel')
    .setDescription('Tells the bot to serve (or stop serving) a channel')
    .addChannelOption(option => option.setName('channel')
                                      .setDescription('The channel to serve')
                                      .setRequired(true)),
	async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const memory = interaction.client.memory;
		const cid = channel.id;

		if (memory.memory['channels'].find(id => id === cid)) {
			console.log('found');
			memory.memory['channels'] = memory.memory['channels'].filter(item => item !== cid);
			memory.save();
			await interaction.reply('Removed that channel from the list of channels I serve.');
		}
		else {
			console.log('added');
			memory.memory['channels'].push(cid);
			memory.save();
			await interaction.reply('Added that channel to the list of channels I serve.');
		}
	},
};
