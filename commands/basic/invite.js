const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Generate an invite link for the bot.'),
    async execute(interaction) {
        const clientId = interaction.client.user.id; 
        const adminPermissions = 8; 

        const inviteURL = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${adminPermissions}&integration_type=0&scope=bot`;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setAuthor({ 
                name: "Invite Link", 
                iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1256597293323256000/invite.png?ex=668158ed&is=6680076d&hm=030c83f567ffdaf0bebb95e50baaec8bb8a8394fa1b7717cc43c3622447f58e3&",
                url: "https://discord.gg/tAD4TFuxZN"
            })
            .setDescription(`Click [here](${inviteURL}) to invite the bot to your server!`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
