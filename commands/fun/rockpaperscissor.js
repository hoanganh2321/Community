const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissor')
        .setDescription('Plays a game of rock, paper, scissors')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Your choice: rock, paper, or scissors')
                .setRequired(true)),
    
    async execute(interaction) {
        let sender = interaction.user;
        let userChoice;
        let botChoice;
        let result;

        if (interaction.isCommand && interaction.isCommand()) {
         
            userChoice = interaction.options.getString('choice').toLowerCase();
        } else {
         
            const message = interaction;
            sender = message.author;
            const args = message.content.split(' ');
            args.shift(); 
            userChoice = args.join(' ').toLowerCase();
        }

        const choices = ['rock', 'paper', 'scissors'];
        botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) {
            return interaction.reply('Invalid choice! Please choose rock, paper, or scissors.');
        }

        if (userChoice === botChoice) {
            result = 'It\'s a tie!';
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'You win!';
        } else {
            result = 'You lose!';
        }

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Rock, Paper, Scissors')
            .setDescription(`**Your choice:** ${userChoice}\n**Bot's choice:** ${botChoice}\n**Result:** ${result}`)
            .setTimestamp();

        if (interaction.isCommand && interaction.isCommand()) {
        
            await interaction.reply({ embeds: [embed] });
        } else {
           
            await interaction.reply({ embeds: [embed] });
        }
    },
};
