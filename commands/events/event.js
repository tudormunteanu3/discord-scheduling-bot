const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Scheduler } = require('../../scheduler.js');
const Event = require('../../models/events');

module.exports = {
    data: {
        name: 'event',
        description: 'Open an event that people can apply to to be notified. e.g:  !event <datetime in ISO format> <event description>'
    },
    async execute(message, args) {
        if (args.length < 3) {
            return message.reply('To use this command, you need to give a title, the date and time in ISO format and the event description, e.g: "!event  2025-02-16T12:00:00 lunchtime!')
        }

        const title = args.shift();
        const datestr = args.shift();
        const eventDate = new Date(datestr)
        if (isNaN(eventDate.getTime())) {
            return message.reply("The date format is incorrect, please use the ISO date/time format, e.g: 2025-02-16T12:00:00")
        }
        if (eventDate< new Date()) {
            return message.reply("That date has already passed, please pick a future date.")
        }

        const duplicate = await Event.findOne({
            title: title,
            eventDate: eventDate
        })
        if(duplicate) {
            return message.reply("That event already exists.")
        }

        const eventDescription = args.join(' ')

        const eventEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(eventDescription)
            .addFields({ name: 'Event Date and time', value: eventDate.toLocaleString(), inline: true })
            .setColor(0x00AE86)
            .setTimestamp();




        const newEvent = new Event({
            title: title,
            description: eventDescription,
            eventDate: eventDate
        });
        const savedEvent = await newEvent.save();


        const confirmButton = new ButtonBuilder()
            .setCustomId(`accept-${savedEvent._id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(confirmButton)

        const eventMessage = await message.channel.send({ embeds: [eventEmbed], components: [row] })






        const scheduler = new Scheduler();
        scheduler.scheduleTask(eventDate, () => {
            eventMessage.reply("It's time for (event placeholder)")
        })
    }
}