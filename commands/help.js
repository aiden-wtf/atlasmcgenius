const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Description about things to do for help/bot itself',
	execute(message, args) {
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
	},
};