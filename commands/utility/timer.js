const { SlashCommandBuilder } = require('@discordjs/builders');
const { setTimeout } = require('timers/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Set a simple timer')
        .addIntegerOption(option => 
            option.setName('minutes')
                .setDescription('Time duration for the timer in minutes')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
           
            const minutes = interaction.options.getInteger('minutes');
            const duration = minutes * 60000; 

            await interaction.reply(`Timer set for ${minutes} minutes.`);

           
            await setTimeout(duration);

            await interaction.followUp(`${interaction.user}, your timer for ${minutes} minutes is up!`);
        } else {
          
            const args = interaction.content.split(' ').slice(1);
            const minutes = parseInt(args[0], 10);

            if (isNaN(minutes)) {
                return interaction.reply('Please provide a valid number of minutes.');
            }

            const duration = minutes * 60000;
            await interaction.reply(`Timer set for ${minutes} minutes.`);

         
            await setTimeout(duration);

            await interaction.reply(`${interaction.author}, your timer for ${minutes} minutes is up!`);
        }
    },
};
