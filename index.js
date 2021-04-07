const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('hey stupid bitch, i logged in fyi');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (message.content === config.prefix + 'brick') {
		message.channel.send('fart');
	}

	else if (command === 'guide') {
		const guide = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('AtlasMC Guide')
			.setURL('https://help.atlasmc.org/')
			.addFields(
				{ name: 'Access the Guide', value: ('You silly little baka! You can find the guide at https://help.atlasmc.org/') },
			);

		message.channel.send(guide);
	}
	else if (command === 'town') {
		if (!args.length) {
			return message.channel.send('No provided town name.');
		}
		else {
			fetch(`${config.api}${args[0]}.txt`)
				.then(res => res.text())
				.then(text => {
					const [ nameRaw, mayorRaw, nationRaw ] = text.split('\n');
					if (nameRaw.startsWith('name')) {
						const name = nameRaw.replace('name=', '');
						const mayor = mayorRaw.replace('mayor=', '');
						const nation2 = nationRaw.replace('nation=', ', ');
						console.log(name, mayor, nation2);

						const townembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(name + nation2)
							.setURL(`${config.api}${args[0]}.txt`)
							.setAuthor('AtlasMC Genius', 'https://cdn.discordapp.com/avatars/829046573966164069/e7e936c145e476b77b052ca28e996c33.png', 'https://atlasmc.org/')
							.addFields(
								{ name: 'Regular field title', value: 'Some value here' },
								{ name: '\u200B', value: '\u200B' },
								{ name: 'Inline field title', value: 'Some value here', inline: true },
								{ name: 'Inline field title', value: 'Some value here', inline: true },
							)
							.addField('Inline field title', 'Some value here', true)
							.setTimestamp()
							.setFooter('Made for AtlasMC by Aiden#2222', 'https://cdn.discordapp.com/avatars/573714496250707978/e93661f68d8fe95eedb373efbd424bbb.png');
						message.channel.send(townembed);
					}
					else {
						message.channel.send('You did **not** send a valid town name.');
					}

				});

		}
	}
},


);

client.login(config.token);
