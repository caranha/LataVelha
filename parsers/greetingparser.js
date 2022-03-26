// Reacts to messages with fixed greeting phrases in them
// Only in "serve" channels

const triggers = {
	'☀️':['good day', 'good morning', 'bom dia'],
	'🌛':['good night', 'good evening', 'boa noite'],
	'🍀':['good luck', 'boa sorte'],
};


module.exports = {
	async parse(message) {
    const memory = message.client.memory;

    if (memory.memory['channels'].find(id => id === message.channel.id)) {
      const text = message.content.toLowerCase();

			// Javascript weirdness: Dicts use "for key in", lists use "for value of"
			for (const react in triggers) {
				for (const pattern of triggers[react]) {
					if (text.indexOf(pattern) >= 0) {
						message.react(react);
						break;
					}
				}
			}
    }

	},
};
