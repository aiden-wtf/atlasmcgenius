const Discord = require('discord.js');

module.exports = {
	name: 'guide',
	description: 'Embed command about guide',
	execute(message, args) {
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
	},
};