const Discord = require('discord.js');
const client = new Discord.Client();

const ytdl = require('ytdl-core');

const token = 'Nzc3NTU2MzM4NDcyNjQ4NzU1.X7FJxQ.MTGqcDMzvI5xKgaUMmLIYhBPLgA'

client.login(token);

client.once('ready', () => {
    console.log('Perjantai Bot is online!')
})

const prefix = '!';

client.on("message", async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(`${prefix}perjantai`)) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Et oo voice channelilla");

        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.log(error);
            return message.channel.send("Jotain meni hänekseen nyt");
        }

        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=BRhzdxslZSY'))
        .on('finish', () => {
            voiceChannel.leave();
        })
    }

    if(message.content.startsWith(`${prefix}pasinperjantai`)) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Et oo voice channelilla");

        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.log(error);
            return message.channel.send("Jotain meni hänekseen nyt");
        }

        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=76yIAQcmj9Y'))
        .on('finish', () => {
            voiceChannel.leave();
        })
    }

    if(message.content.startsWith(`${prefix}komennot`)) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Komennot')
        .setDescription('Tässä Perjantai Botin komennot')
        .addFields(
            {name: '!perjantai', value: 'Soittaa perjantaibiisin'},
            {name: '!pasinperjantai', value: 'Soittaa pasin perjantaivideon'}
        )
        .setImage('https://static.luolasto.org/file/varavarasto/38215/tiedosto.jpg')

        message.channel.send(newEmbed);
    }
 
});