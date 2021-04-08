// Getting resources needed for bot (discord, fetch, config, etc.)
const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const client = new Discord.Client();

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
		const guide = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('AtlasMC Guide')
			.setURL('https://help.atlasmc.org/')
			.setAuthor('AtlasMC Genius', 'https://cdn.discordapp.com/avatars/829046573966164069/e7e936c145e476b77b052ca28e996c33.png', 'https://atlasmc.org/')
			.setThumbnail('https://i.imgur.com/0ev7fqF.png')
			.addFields(
				{ name: 'Access the Guide', value: ('You can find the guide at https://help.atlasmc.org/') },
			)
			.setTimestamp()
			.setFooter('Made with ❤️ by Aiden#2222', 'https://cdn.discordapp.com/avatars/573714496250707978/e93661f68d8fe95eedb373efbd424bbb.png');


		message.channel.send(guide);
	}

	else if (command === 'help') {
		const guide = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('AtlasMC Help')
			.setURL('https://atlasmc.org/')
			.setAuthor('AtlasMC Genius', 'https://cdn.discordapp.com/avatars/829046573966164069/e7e936c145e476b77b052ca28e996c33.png', 'https://atlasmc.org/')
			.setThumbnail('https://i.imgur.com/wfBIO9d.png')
			.addFields(
				{ name: 'Help', value: ('Need a little help? Make sure to check out our guide (~guide) and important discord channels like #information and more!') },
				{ name: 'About the Bot', value: ('AtlasMC Genius is a custom discord bot made by Aiden#2222. You can use it for basic commands, like this one, or to fetch information from Towny (~town), and more!') },
			)
			.setTimestamp()
			.setFooter('Made with ❤️ by Aiden#2222', 'https://cdn.discordapp.com/avatars/573714496250707978/e93661f68d8fe95eedb373efbd424bbb.png');

		message.channel.send(guide);
	}

	else if (command === 'nation' || command === 'n') {
		if (!args.length) {
			return message.channel.send('No provided nation name.')
		}
		else {

		}

	else if (command === 'town' || command === 't') {
			if (!args.length) {
			// If there is no arguments (the information after the command) then it will return this
				return message.channel.send('No provided town name.');
			}
			else {
			// Fetching plain text data from Towny "API"
				fetch(`${config.api}${args[0]}.txt`)
					.then(res => res.text())
					.then(text => {
					// Splitting the text on each line for raw variables
						const [ nameRaw, mayorRaw, nationRaw, assistantRaw, ph1, ph2, boardRaw, tagRaw, protectionRaw, bonusBlockRaw, purchasedBlockRaw, taxPercentRaw, maxTaxRaw, taxRaw, plotPriceRaw, plotTaxRaw, cPlotPriceRaw, cPlotTaxRaw, ePlotPriceRaw, ePlotTaxRaw, spawnTaxRaw, hasUpkeepRaw, openRaw, adminDisabledPVPRaw, adminEnabledPVPRaw, publicRaw, conqueredRaw, conqueredDaysRaw, uuidRaw, foundedRaw, homeBlockRaw, spawnRaw, outpostRaw, jailSpawnsRaw, outlawsRaw, metaDataRaw, ruinedRaw, ruinedTimeRaw, neutralRaw, debtRaw ] = text.split('\n');

						// Checking if the first line starts with name=, as it should on this API format
						if (nameRaw.startsWith('name')) {

							// Basic information variable definitions
							const name = nameRaw.replace('name=', '').replace('_', ' ');
							const mayor = mayorRaw.replace('mayor=', '');
							const board = boardRaw.replace('townBoard=', '');
							const taxamount = taxRaw.replace('taxes=', '').replace('.0', '');
							const debt = debtRaw.replace('debtBalance=', '$').replace('.0', '');

							// Ruin Block (Checks if it ruined, and the amt of time it is ruined)
							const ruined = ruinedRaw.replace('ruined=', '').replace('true', 'True').replace('false', 'False');
							const ruinedTime = ruinedTimeRaw.replace('ruinedTime=', '');

							// Conquered Block (checks if it is conquered, and the amt of time it has been conquered)
							const conquered = conqueredRaw.replace('conquered=', '').replace('true', 'True').replace('false', 'False');
							const conqueredTime = conqueredDaysRaw.replace('conqueredDays ', '');

							// Outlaw Block - Replacing plain txt with formatting and spacing
							const outlaw = outlawsRaw.replace('outlaws=', '').replace(',', ', ');
							// Checks if the string for outlaws has a value, if it doesn't, return the string of None
							if (outlaw === '') {
								global.outlawembed = 'None';
							}
							else {
								global.outlawembed = outlaw;
							}

							// Founded Date/Time Block
							const founded = foundedRaw.replace('registered=', '');
							// Changing value (Epoch Time) to readable format * 1 (idk why)
							const current_datetime = new Date(founded * 1);
							// Format the "readable" format time into a even more presentable format (YYYY-MM-DD)
							const formatted_date = current_datetime.getFullYear(founded) + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getDate();

							// Splitting home block X + Z
							const [ homeBlockX, homeBlockZ ] = homeBlockRaw.replace('homeBlock=world,', '').split(',');
							// Splitting spawn X, Y, Z, + blank/unknown placeholders
							const [ spawnX, spawnY, spawnZ ] = spawnRaw.replace('spawn=world,', '').split(',');

							// Making taxpercent display % if it is true, and nothing if it is false
							const taxpercent = taxPercentRaw.replace('taxpercent=', '').replace('false', '').replace('true', '%');

							// Making taxfixed display $ if it is (taxpercent) false, and nothing if it is true
							const taxfixed = taxPercentRaw.replace('taxpercent=', '').replace('false', '$').replace('true', '');

							// Combining all of the tax modules to form a finished, formatted value
							const tax = taxfixed + taxamount + taxpercent;

							// Nation variable definitions
							const nation = nationRaw.replace('nation=', '').replace('_', ' ');
							const nation2 = nationRaw.replace('nation=', ', ').replace('_', ' ');

							// Embed declaration
							const townembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(name + nation2)
								.setURL('https://map.atlasmc.org/#world;flat;' + homeBlockX * 16 + ',64,' + homeBlockZ * 16 + ';6')
								.setAuthor('AtlasMC Genius', 'https://cdn.discordapp.com/avatars/829046573966164069/e7e936c145e476b77b052ca28e996c33.png', 'https://atlasmc.org/')
								.setThumbnail('https://minotar.net/avatar/' + mayor)
								.addFields(
									{ name: 'Board', value: board, inline: false },
									{ name: 'Mayor', value: mayor, inline: true },
									{ name: 'Nation', value: nation, inline: true },
									{ name: 'Founded', value: formatted_date, inline: true },
									{ name: 'Tax', value: tax, inline: true },
									{ name: 'Debt', value: debt, inline: true },
									{ name: 'Spawn', value: `${spawnX}, ${spawnY}, ${spawnZ}`, inline: true },
									{ name: 'Ruined?', value: ruined + ' (' + ruinedTime + ')', inline: true },
									{ name: 'Conquered?', value: conquered + ' (' + conqueredTime + ')', inline: true },
									{ name: 'Outlaws', value: global.outlawembed, inline: true },
								)
								.setTimestamp()
								.setFooter('Made with ❤️ by Aiden#2222', 'https://cdn.discordapp.com/avatars/573714496250707978/e93661f68d8fe95eedb373efbd424bbb.png');
							// Sending the Embed to chat
							message.channel.send(townembed);
						}
						// If it did not detect the name= / correct format, it will return this message instead
						else {
							message.channel.send('You did not send a valid town name. Check capitalization or grammar.');
						}

					});

			}
		}
	}


});

client.login(config.token);
