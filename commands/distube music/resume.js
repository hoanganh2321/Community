const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { DisTubeError } = require('distube');
const musicIcons = require('../../UI/icons/musicicons'); 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the paused song'),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to resume music!');
        }

        const permissions = voiceChannel.permissionsFor(interaction.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return interaction.reply('I need the permissions to join and speak in your voice channel!');
        }

        try {
            await interaction.reply('**Resuming the paused song...**');

            // Resume the song
            await interaction.client.distube.resume(voiceChannel);

            const resumedEmbed = new EmbedBuilder()
                .setColor('#DC92FF')
                .setAuthor({ 
                    name: "Song Resumed", 
                    iconURL: musicIcons.pauseresumeIcon ,
                    url: "https://discord.gg/tAD4TFuxZN"
                })
                .setFooter({ text: 'Distube Player', iconURL: musicIcons.footerIcon })
                .setDescription('**The paused song has been resumed.**');

            if (interaction.isCommand && interaction.isCommand()) {
                await interaction.editReply({ embeds: [resumedEmbed] });
            } else {
                await interaction.reply({ embeds: [resumedEmbed] });
            }
        } catch (error) {
            console.error(error);

            if (error instanceof DisTubeError && error.code === 'NO_QUEUE') {
                const noQueueEmbed = new EmbedBuilder()
                    .setColor('#DC92FF')
                    .setAuthor({ 
                        name: "Oops!", 
                        iconURL: musicIcons.wrongIcon ,
                         url: "https://discord.gg/tAD4TFuxZN"
                        })
                    .setFooter({ text: 'Distube Player', iconURL: musicIcons.footerIcon })    
                    .setDescription('**No song playing in the guild.**');

                if (interaction.isCommand && interaction.isCommand()) {
                    await interaction.editReply({ embeds: [noQueueEmbed] });
                } else {
                    await interaction.reply({ embeds: [noQueueEmbed] });
                }
            } else if (error instanceof DisTubeError && error.code === 'NOT_PAUSED') {
                const notPausedEmbed = new EmbedBuilder()
                    .setColor('#DC92FF')
                    .setAuthor({ 
                        name: "Oops!", 
                        iconURL: musicIcons.wrongIcon ,
                         url: "https://discord.gg/tAD4TFuxZN"
                        })
                    .setFooter({ text: 'Distube Player', iconURL: musicIcons.footerIcon })        
                    .setDescription('**The music player is not paused.**');

                if (interaction.isCommand && interaction.isCommand()) {
                    await interaction.editReply({ embeds: [notPausedEmbed] });
                } else {
                    await interaction.reply({ embeds: [notPausedEmbed] });
                }
            } else if (error instanceof DisTubeError && error.code === 'RESUMED') {
                const alreadyResumedEmbed = new EmbedBuilder()
                    .setColor('#DC92FF')
                    .setAuthor({ 
                        name: "Oops!", 
                        iconURL: musicIcons.wrongIcon ,
                         url: "https://discord.gg/tAD4TFuxZN"
                        })
                    .setFooter({ text: 'Distube Player', iconURL: musicIcons.footerIcon })    
                    .setDescription('**The music player is already resumed.**');

                if (interaction.isCommand && interaction.isCommand()) {
                    await interaction.editReply({ embeds: [alreadyResumedEmbed] });
                } else {
                    await interaction.reply({ embeds: [alreadyResumedEmbed] });
                }
            } else {
                const errorMessage = 'An error occurred while trying to resume the song.';
                if (interaction.isCommand && interaction.isCommand()) {
                    await interaction.editReply(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
    },
};
