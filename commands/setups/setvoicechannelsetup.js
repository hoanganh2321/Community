const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const cmdIcons = require('../../UI/icons/commandicons');
const configPath = path.join(__dirname, '../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setvoicechannelsetup')
        .setDescription('Set the voice channel setup for a server')
        .addStringOption(option =>
            option.setName('serverid')
                .setDescription('The ID of the server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mainvoicechannelid')
                .setDescription('The ID of the main voice channel')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('adminroleid')
                .setDescription('The ID of the admin role for voice channels')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('managerchannelid')
                .setDescription('The ID of the manager channel')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('status')
                .setDescription('The status of the voice channel setup')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) { 
        const serverId = interaction.options.getString('serverid');
        const mainVoiceChannelId = interaction.options.getString('mainvoicechannelid');
        const adminRoleId = interaction.options.getString('adminroleid');
        const managerChannelId = interaction.options.getString('managerchannelid');
        const status = interaction.options.getBoolean('status');
        const guild = interaction.guild;
        if (serverId !== guild.id) {
            return interaction.reply({ content: 'The server ID provided does not match the server ID of this server.', ephemeral: true });
        }

        if (!serverId || !mainVoiceChannelId || !adminRoleId || !managerChannelId || status === null) {
            return interaction.reply({ content: 'Invalid input. Please provide valid server ID, main voice channel ID, admin role ID, manager channel ID, and status.', ephemeral: true });
        }

  
        fs.readFile(configPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading config file:', err);
                return interaction.reply({ content: 'There was an error reading the config file.', ephemeral: true });
            }

            let config;
            try {
                config = JSON.parse(data);
            } catch (err) {
                console.error('Error parsing config file:', err);
                return interaction.reply({ content: 'There was an error parsing the config file.', ephemeral: true });
            }

        
            if (!config.owners) {
                config.owners = {};
            }

   
            const serverOwnerId = interaction.guild.ownerId;
            const memberId = interaction.user.id;
            const ownerId = config.owners[serverId];

            if (memberId !== serverOwnerId && memberId !== ownerId) {
                return interaction.reply({ content: 'Only the server owner or specified owners can use this command.', ephemeral: true });
            }

     
            if (!config.voiceChannelSetup) {
                config.voiceChannelSetup = {};
            }

            if (!config.voiceChannelSetup[serverId]) {
                config.voiceChannelSetup[serverId] = {};
            }

            config.voiceChannelSetup[serverId].mainVoiceChannelId = mainVoiceChannelId;
            config.voiceChannelSetup[serverId].adminRoleId = adminRoleId;
            config.voiceChannelSetup[serverId].managerChannelId = managerChannelId;
            config.voiceChannelSetup[serverId].status = status;

       
            fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
                if (err) {
                    console.error('Error writing config file:', err);
                    return interaction.reply({ content: 'There was an error writing to the config file.', ephemeral: true });
                }

                interaction.reply({ content: `Voice channel setup updated successfully for server ID ${serverId}.`, ephemeral: true });
            });
        });
    }else {
        const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({ 
            name: "Alert!", 
            iconURL: cmdIcons.dotIcon ,
            url: "https://discord.gg/tAD4TFuxZN"
        })
        .setDescription('- This command can only be used through slash command!\n- Please use `/setvoicechannelsetup` to setup.')
        .setTimestamp();
    
        await interaction.reply({ embeds: [embed] });
    
        }  
    },
};
