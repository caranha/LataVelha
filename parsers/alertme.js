module.exports = {
	async parse(message) {

    const client = message.client;
    const memory = message.client.memory;

    if (!memory.memory['alerts']) return;

    const alertlist = memory.memory['alerts'];

    // for each user
    for (const uid in alertlist) {
      // test the alerts of that user
      for (const i in alertlist[uid]) {
        const regex = new RegExp(alertlist[uid][i]);
        if (regex.test(message.content)) {
          client.users.fetch(uid, false).then((user) => {
            user.send('You asked me to alert you to messages that match ' + regex);
            user.send(message.url);
          });
          return;
        }
      }
    }
	},
};
