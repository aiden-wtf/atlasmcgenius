// Getting resources needed for bot (discord, fetch, config, etc.)
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./commands/config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Notification that bot is logged into Discord
client.once('ready', () => {
	console.log('hey stupid bitch, i logged in fyi');
});

// Cancelling any responses to the bot itself or anything without the specified prefix
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Joke command that finds prefix + 'brick' and returns 'fart'
	if (message.content === config.prefix + 'brick') {
		message.channel.send('fart');
	}
	// Command = guide, will return a embed.
	else if (command === 'guide') {
		client.commands.get('guide').execute(message, args);
	}
	else if (command === 'help') {
		client.commands.get('help').execute(message, args);
	}
	else if (command === 'town' || command === 't') {
		client.commands.get('town').execute(message, args);
	}
	else if (command === 'nation' || command === 'n') {
		client.commands.get('nation').execute(message, args);
	}
},

client.login(config.token));
