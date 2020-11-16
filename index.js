const Discord = require('discord.js');
const client = new Discord.Client();

const queue = new Map();

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
    const serverQueue = queue.get(message.guild.id);

    if(message.content.startsWith(`${prefix}perjantai`)) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Et oo voice channelilla");

        //const songInfo = await ytdl.getInfo(args[1]);
        const song = "./biisi.mp3"

        if (talkedRecently.has(message.author.id)) {
            message.channel.send('Sul on cooldown');
        } else {

            if(!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                }
                queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song)

                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    queue.delete(message.guild.id);
                    console.log(error);
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send('Perjantai-biisi lisätty queueen');
            }
            return undefined;
        }

    } else if (message.content.startsWith(`${prefix}lopeta`)) {
        if(!message.member.voice.channel) return message.channel.send('Sun pitää olla voice kannul että voit stoppaa musan');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.member.voice.channel.leave();
        return undefined;
    }

    if(message.content.startsWith(`${prefix}entajuu`)) {
        message.channel.send('https://static.luolasto.org/file/varavarasto/38215/tiedosto.jpg')
    }

    function play(guild, song) {
        const serverQueue = queue.set(guild.id);
    
        if(!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
    
        const dispatcher = serverQueue.connection.play(song)
            .on('finish', () => {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
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
 
});