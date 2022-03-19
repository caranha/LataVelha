// Reacts to messages with the word "bot" in them, but only
// if in allowed channels.
const choice = require('../utils/choice_array.js');
const drinks = ['☕', '🍵', '🧋', '🥛', '🧉', '🧃'];
const weights = [10, 5, 1, 1, 2, 1];

module.exports = {
	async parse(message) {
    const memory = message.client.memory;

    if (memory.memory['channels'].find(id => id === message.channel.id)) {

      const text = message.content.toLowerCase();

      if (text.indexOf('bot') >= 0) {
        message.react(choice(drinks, weights));
      }
    }

	},
};
