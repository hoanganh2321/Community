const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const cmdIcons = require('../../UI/icons/commandicons');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from a member')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The member to remove a role from')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to remove')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) { 
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription('You do not have permission to use this command.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const target = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(target.id);

        if (!member.roles.cache.has(role.id)) {
            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setDescription(`${target.tag} does not have the role ${role.name}.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await member.roles.remove(role);
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setDescription(`Removed the role ${role.name} from ${target.tag}.`);
        await interaction.reply({ embeds: [embed] });
    } else {
        const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({ 
            name: "Alert!", 
            iconURL: cmdIcons.dotIcon ,
            url: "https://discord.gg/tAD4TFuxZN"
        })
        .setDescription('- This command can only be used through slash command!\n- Please use `/removerole` to remove a role from a member.')
        .setTimestamp();
    
        await interaction.reply({ embeds: [embed] });
    
        }   
    
    },
};
