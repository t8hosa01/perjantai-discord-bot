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
        .on('finish', () =>{
            voiceChannel.leave();
        })
    }
 
});