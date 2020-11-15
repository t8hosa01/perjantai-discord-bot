const Discord = require('discord.js');
const client = new Discord.Client();

const ytdl = require('ytdl-core');

const fs = require('fs');

const token = 'Nzc3NTU2MzM4NDcyNjQ4NzU1.X7FJxQ.wMjnXJeN8JuCSxw-6aT4qPFcd10'

client.login(token);

client.once('ready', () => {
    console.log('Perjantai Bot is online!')
})

const prefix = '!';

const talkedRecently = new Set();

client.on("message", async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(`${prefix}perjantai`)) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Et oo voice channelilla");

        if (talkedRecently.has(message.author.id)) {
            message.channel.send('Sul on cooldown');
        } else {
            try {
                var connection = await voiceChannel.join();
            } catch (error) {
                console.log(error);
            }
    
            const dispatcher = connection.play('./biisi.mp3')
            .on('finish', () => {
                voiceChannel.leave();
            })
            .on('error', error => {
                console.log(error);
            })
            dispatcher.setVolumeLogarithmic(5 / 5);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 60000);
        }

    } else if (message.content.startsWith(`${prefix}lopeta`)) {
        if(!message.member.voice.channel) return message.channel.send('Sun pitää olla voice kannul että voit stoppaa musan');
        message.member.voice.channel.leave();
        return undefined;
    }

    if(message.content.startsWith(`${prefix}entajuu`)) {
        message.channel.send('https://static.luolasto.org/file/varavarasto/38215/tiedosto.jpg')
    }
 
});