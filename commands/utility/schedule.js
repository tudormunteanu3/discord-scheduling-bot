const {scheduleJob} = require('node-schedule')
const { Scheduler } = require('../../scheduler.js');

module.exports = {
    data: {
    name: 'schedule',
    description: 'Schedules an event. e.g: !schedule <ISO date time format> <event description>',
    },
    async execute(message, args) {
        if (args.length <2) {
            return message.reply("Please pick a time and date in ISO format, and add an event description.")
        }

        const dateStr = args.shift();
        const date = new Date(dateStr)
        const eventDescription = args.join(' ');

        if (isNaN(date)) {
            return message.reply("Date is in invalid format or not a number.")
        }
        const scheduler = new Scheduler();
        scheduler.scheduleTask(date, () => {
            message.channel.send(`Reminder: ${eventDescription}`)
        })
        
        return message.reply(`Scheduled reminder for ${date.toLocaleString()}.`);
    }
}