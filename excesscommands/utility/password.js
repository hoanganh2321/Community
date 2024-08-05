const Discord = require('discord.js');
const generator = require('generate-password');

module.exports = {
  name: 'password',
  description: 'Generate a random password and send it via DM.',

  async execute(message, args) {
    const password = generator.generate({
      length: 12,
      symbols: true,
      numbers: true
    });


    message.reply("Password sent to your DM.");

    try {
    
      const dmEmbed = new Discord.EmbedBuilder()
        .setTitle('🔑 Your Generated Password')
        .addFields(
          { name: "🔑 Password", value: `${password}`, inline: true },
          { name: "👣 Length", value: `12`, inline: true }
        );
      await message.author.send({ embeds: [dmEmbed] }); 
    } catch (error) {
      console.error("Error sending DM:", error); 
      message.reply("I couldn't send you a DM. Please make sure your DMs are open.");
    }
  }
};