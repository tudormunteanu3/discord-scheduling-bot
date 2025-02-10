# discord-scheduling-bot
Discord scheduling bot with NodeJS backend + React frontend and MongoDB database.

In order to run the bot:

You will need the environment keys for the Discord token and the Mongo URI. 

For the Discord token, you need to create a bot on the Discord Developer Portal at: https://discord.com/developers/docs/intro
For the MongoURI you can get it by starting your mongodb using `mongod` then using `mongosh` to find the URI in the shell.

Then:
1. Open powershell and navigate to folder.
2. Run `mongod` command.
3. Run `node index.js`
4. Run `node server.js`
5. Navigate to the DiscordBot folder(ReactJS folder) and run `npm run dev`


Functionality:

1.The bot has a simple pomodoro timer functionality, in order to use it just type `!pomodoro`. This will start a timer with a default of 25minutes. Otherwise, you can type `!pomodoro X` where X= any number, and it will make a timer for X minutes. E.g: `!pomodoro 5` would start a 5minute timer. At the end of the timer, the user gets pinged that its time for a break.
2.The !event command creates an event that people can apply to to be notified of that is linked to a react frontend where you can see, edit and delete the current open events. 
To run: `!event EventTitle EventDate EventDescription`. The Event Date needs to be in ISO format, so for example: `!event Important Event 2025-02-15T12:00:00 The most important event of all time`.
Then, on the React frontend at `http://localhost:5173/` you can see and interact with the events.
