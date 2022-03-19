const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('regex-alert-set')
    .setDescription('Sets an alert that dms you every time a message matches the regex')
    .addStringOption(option => option.setName('expression')
                                     .setDescription('The Regex to Alert you for')
                                     .setRequired(true)),
	async execute(interaction) {
    const uid = interaction.user.id;

    const regex = interaction.options.getString('expression');
    const memory = interaction.client.memory;

    if (!memory.memory['alerts']) {
      memory.memory['alerts'] = { };
    }

    if (!memory.memory['alerts'][uid]) {
      memory.memory['alerts'][uid] = [];
    }

    memory.memory['alerts'][uid].push(regex);
    memory.save();

    // In memory.alerts, add a list of regex for each user;
    interaction.reply('Okay!');
	},
};
