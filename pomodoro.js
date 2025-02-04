const schedule = require('node-schedule')

class Pomodoro {
    constructor(duration=25) {
        this.duration = duration
    }

    startSession(channel,user) {
        channel.send(`${user} started a pomodoro timer for ${this.duration} minutes.`)
        schedule.scheduleJob(new Date(Date.now() + this.duration * 60000), () => {
            channel.send(`${user} the pomodoro session is over! Break time.`)
        })
    }
}

module.exports = {Pomodoro}