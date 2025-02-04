const schedule = require('node-schedule')

class Scheduler {
    scheduleTask(date, task) {
        return schedule.scheduleJob(date, task)
    }
}

module.exports = { Scheduler }