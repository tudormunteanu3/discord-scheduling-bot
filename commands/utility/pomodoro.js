const { Pomodoro } = require('../../pomodoro.js');

module.exports = {
    data: {
    name: 'pomodoro',
    },
    description: 'Creates a pomodoro timer. e.g: !pomodoro <time in minutes>',

    async execute(message, args) {
        let defaultDuration = 25;
        if (args.length >= 1) {
            const parsed = parseInt(args[0], 10);
            if (!isNaN(parsed)) {
                defaultDuration = parsed;
            }
        }
        const pomodoro = new Pomodoro(defaultDuration);
        pomodoro.startSession(message.channel, message.author.username)
    }
}