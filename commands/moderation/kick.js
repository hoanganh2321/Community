const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const cmdIcons = require('../../UI/icons/commandicons');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) { 
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription('You do not have permission to use this command.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (!member.kickable) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(`I cannot kick ${target.tag}!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await member.kick();
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setDescription(`${target.tag} has been kicked.`);
        await interaction.reply({ embeds: [embed] });

    }else {
        const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({ 
            name: "Alert!", 
            iconURL: cmdIcons.dotIcon ,
            url: "https://discord.gg/tAD4TFuxZN"
        })
        .setDescription('- This command can only be used through slash command!\n- Please use `/kick` to kick a member.')
        .setTimestamp();
    
        await interaction.reply({ embeds: [embed] });
    
        }  
    },
};
