const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');

module.exports = {
	name: 'nation',
	description: 'Fetches nation information from Towny API.',
	execute(message, args) {
		if (!args.length) {
			// If there is no arguments (the information after the command) then it will return this
			return message.channel.send('No provided nation name.');
		}
		else {
			// Fetching plain text data from Towny "API"
			fetch(`${config.api}nations/${args[0]}.txt`)
				.then(res => res.text())
				.then(text => {
					// Splitting the text on each line for raw variables
					const [ capitalRaw, boardRaw, mapColorRaw, alliesRaw, enemiesRaw, taxRaw, spawnRaw, peacefulRaw, uuidRaw, foundedRaw ] = text.split('\n');

					// Checking if the first line starts with name=, as it should on this API format
					if (capitalRaw.startsWith('capital')) {

						// Defining Name Seperately with args as data isn't present in API
						const name = args[0].replace('_', ' ');

						// Basic information variable definitions
						const capital = capitalRaw.replace('capital=', '').replace('_', ' ');
						const capitalfetch = capitalRaw.replace('capital=', '');
						const board = boardRaw.replace('nationBoard=', '');
						const taxamount = taxRaw.replace('taxes=', '$').replace('.0', '');
						const mapColor = mapColorRaw.replace('mapColorHexCode=', '');
						const allies = alliesRaw.replace('allies=', '').replaceAll(',', ', ');
						const enemies = enemiesRaw.replace('enemies=', '').replaceAll(',', ', ');
						const peaceful = peacefulRaw.replace('neutral=', '').replace('true', 'Yes').replace('false', 'No');

						// Checks if the string for allies has a value, if it doesn't, return the string of None
						if (allies === '') {
							global.alliesembed = 'None';
						}
						else {
							global.alliesembed = allies;
						}

						// Checks if the string for enemies has a value, if it doesn't, return the string of None
						if (enemies === '') {
							global.enemiesembed = 'None';
						}
						else {
							global.enemiesembed = allies;
						}
						// Founded Date/Time Block
						const founded = foundedRaw.replace('registered=', '');
						// Changing value (Epoch Time) to readable format * 1 (idk why)
						const current_datetime = new Date(founded * 1);
						// Format the "readable" format time into a even more presentable format (YYYY-MM-DD)
						const formatted_date = current_datetime.getFullYear(founded) + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getDate();

						// Fetching information on capital
						fetch(`${config.api}towns/${capitalfetch}.txt`)
							.then(res => res.text())
							.then(data => {
								const [ nameRaw, mayorRaw, nationRaw, assistantRaw, ph1, ph2, boardRaw, tagRaw, protectionRaw, bonusBlockRaw, purchasedBlockRaw, taxPercentRaw, maxTaxRaw, taxRaw, plotPriceRaw, plotTaxRaw, cPlotPriceRaw, cPlotTaxRaw, ePlotPriceRaw, ePlotTaxRaw, spawnTaxRaw, hasUpkeepRaw, openRaw, adminDisabledPVPRaw, adminEnabledPVPRaw, publicRaw, conqueredRaw, conqueredDaysRaw, uuidRaw, foundedRaw, homeBlockRaw ] = data.split('\n');
								const king = mayorRaw.replace('mayor=', '');
								// Splitting home block X + Z
								const homeBlock = homeBlockRaw.replace('homeBlock=world,', '');
								// Splitting home block X + Z
								const [ homeBlockX, homeBlockZ ] = homeBlock.split(',');

								// Embed declaration
								const nationembed = new Discord.MessageEmbed()
									.setColor(`#${mapColor}`)
									.setTitle(name)
									.setURL('https://map.atlasmc.org/#world;flat;' + homeBlockX * 16 + ',64,' + homeBlockZ * 16 + ';6')
									.setAuthor('AtlasMC Genius', 'https://cdn.discordapp.com/avatars/829046573966164069/e7e936c145e476b77b052ca28e996c33.png', 'https://atlasmc.org/')
									.setThumbnail('https://minotar.net/avatar/' + king)
									.addFields(
										{ name: 'Board', value: board, inline: false },
										{ name: 'King', value: king, inline: true },
										{ name: 'Capital', value: capital, inline: true },
										{ name: 'Founded', value: formatted_date, inline: true },
										{ name: 'Allies', value: alliesembed, inline: true },
										{ name: 'Enemies', value: enemiesembed, inline: true },
										{ name: 'Tax', value: taxamount, inline: true },
										{ name: 'Peaceful?', value: peaceful, inline: true },
									)
									.setTimestamp()
									.setFooter('Made with ❤️ by Aiden#2222', 'https://cdn.discordapp.com/avatars/573714496250707978/e93661f68d8fe95eedb373efbd424bbb.png');
								// Sending the Embed to chat
								message.channel.send(nationembed);
							});

					}
					// If it did not detect the name= / correct format, it will return this message instead
					else {
						message.channel.send('You did not send a valid nation name. Check capitalization or grammar.');
					}
				});
		}
	} };