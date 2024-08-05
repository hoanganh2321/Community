const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');

const commandFolders = ['anime', 'basic', 'fun', 'moderation', 'utility', 'distube music', 'setups'];
const enabledCategories = config.excessCommands;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of commands'),

    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
            const supportServerLink = "https://discord.gg/tAD4TFuxZN"
            const serverId = interaction.guildId;
            const serverPrefix = config.prefixes.server_specific[serverId] || config.prefixes.default;

            const createSlashCommandPages = () => {
                const pages = [
                    {
                        title: "Bot Information",
                        description: `This bot offers a comprehensive suite of commands designed to enhance your Discord server experience. It seamlessly integrates both prefix and slash commands\n\n` +
                            `**Developed By:** Jfunk_\n` +
                            `**Version:** 1.0.0\n` +
                            `**Node Version:** v20.12.2\n` +
                            `**Discord.js Version:** 14.15.3`,
                        commands: [
                            "\nJoin our Discord server - [Discord](https://discord.gg/tAD4TFuxZN)\n\n"
                        ],
                        image: "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662",
                        color: "#3498db",
                        thumbnail: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&",
                        author: {
                            name: "ALL IN ONE BOT",
                            iconURL: "https://cdn.discordapp.com/attachments/1230824451990622299/1253655046835408917/2366-discord-developers.gif?ex=6676a4be&is=6675533e&hm=0b39917ea5a274d222a001017886e3b43725191f671b34efe5349f82be57968c&",
                            url: "https://discord.gg/tAD4TFuxZN"
                        }
                    }
                ];

                const commandData = {};

                for (const folder of commandFolders) {
                    const commandFiles = fs.readdirSync(path.join(__dirname, `../../commands/${folder}`)).filter(file => file.endsWith('.js'));
                    commandData[folder] = commandFiles.map(file => {
                        const command = require(`../../commands/${folder}/${file}`);
                        return command.data.name;
                    });
                }

                for (const [category, commands] of Object.entries(commandData)) {
                    const page = {
                        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`,
                        description: `**Total Commands : **${commands.length}\n` +
                            `**Usage : **Both Slashcommands and Prefix\n\n` +
                            `${category.charAt(0).toUpperCase() + category.slice(1)} related commands`,
                        commands: commands.map(command => `\`\`${command}\`\``),
                        image: "",
                        color: "#3498db",
                        thumbnail: "",
                        author: {
                            name: `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`,
                            iconURL: "",
                            url: "https://discord.gg/tAD4TFuxZN"
                        }
                    };

                    switch (category) {
                        case 'anime':
                            page.image = "https://cdn.discordapp.com/attachments/1246408947708072027/1253714802048499752/1111.gif?ex=6676dc65&is=66758ae5&hm=9bc3f45ed4930d62def2369c6a27fdd65f24df0fdbe557a7ff7d330090eac1bf&";
                            page.color = "#ff66cc";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1246408947708072027/1255167194036437093/1558-zerotwo-exciteddance.gif?ex=667c250a&is=667ad38a&hm=09e6db36fd79436eb57de466589f21ca947329edd69b8e591d0f6586b89df296&";
                            break;
                        case 'basic':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#99ccff";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'fun':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ffcc00";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'moderation':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ff0000";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'utility':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#00cc99";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'distube music':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ff0000";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'setups':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ff0000";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        default:
                            page.color = "#3498db"; // Set a default color if none matches
                            break;
                    }

                    pages.push(page);
                }

                return pages;
            };

            const createPrefixCommandPages = () => {
                const pages = [];

                const prefixCommands = {};

                for (const [category, isEnabled] of Object.entries(enabledCategories)) {
                    if (isEnabled) {
                        const commandFiles = fs.readdirSync(path.join(__dirname, `../../excesscommands/${category}`)).filter(file => file.endsWith('.js'));
                        prefixCommands[category] = commandFiles.map(file => {
                            const command = require(`../../excesscommands/${category}/${file}`);
                            return {
                                name: command.name,
                                description: command.description
                            };
                        });
                    }
                }

                for (const [category, commands] of Object.entries(prefixCommands)) {
                    const page = {
                        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`,
                        description: `**Total Commands : **${commands.length}\n` +
                            `**Usage : **Only Prefix commands with \`${serverPrefix}\`\n\n` +
                            `${category.charAt(0).toUpperCase() + category.slice(1)} related commands`,
                        commands: commands.map(command => `\`\`${command.name}\`\``),
                        image: "",
                        color: "",
                        thumbnail: "",
                        author: {
                            name: `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`,
                            iconURL: "",
                            url: "https://discord.gg/tAD4TFuxZN"
                        }
                    };

                    switch (category) {
                        case 'utility':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#00cc99";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1255164064192270418/2861-tool.gif?ex=667c2220&is=667ad0a0&hm=17d2f57af30831b62639fd3d06853a7bc423e1a96b36e5994f432b65aa9f30dc&";
                            break;
                        case 'other':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ff6600";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'hentai':
                            page.image = "https://cdn.discordapp.com/attachments/1246408947708072027/1255160148272353373/Rias.gif?ex=667c1e7b&is=667accfb&hm=cd9d086020fd0e062be92126942d1d683c15a878bb699b000d9db9a34447eb6c&";
                            page.color = "#ff99cc";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=667beaa8&is=667a9928&hm=50dfab0b5a63dab7abdc167899c447041b9717016c71e4ffe377a0d7a989d6b5&";
                            break;
                        case 'lavalink':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#ffcc00";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        case 'troll':
                            page.image = "https://media.discordapp.net/attachments/1264134884432285766/1267433642687463517/ALL_IN_ONE_PUBLIC.png?ex=66a96dd0&is=66a81c50&hm=34f1213757bafbbe440abd641822d90306bed34d0aeeaf359c1069efbc0d4ffb&=&format=webp&quality=lossless&width=1177&height=662";
                            page.color = "#cc0000";
                            page.thumbnail = "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&";
                            page.author.iconURL = "https://cdn.discordapp.com/attachments/1230824451990622299/1253655047259160596/6186-developer-bot.gif?ex=66a9667f&is=66a814ff&hm=1494b63ccfaf2dae30a35af520fb748dd17e76195c206f2925b526595018c60f&";
                            break;
                        default:
                            page.color = "#3498db"; // Set a default color if none matches
                            break;
                    }

                    pages.push(page);
                }

                return pages;
            };

            const slashCommandPages = createSlashCommandPages();
            const prefixCommandPages = createPrefixCommandPages();
            let currentPage = 0;
            let isPrefixHelp = false;

            const createEmbed = () => {
                const pages = isPrefixHelp ? prefixCommandPages : slashCommandPages;
                const page = pages[currentPage];
                const fieldName = page.title === "Bot Information" ? "Additional Information" : "Commands";

                // Ensure a valid color is always set
                const color = page.color || '#3498db';

                return new EmbedBuilder()
                    .setTitle(page.title)
                    .setDescription(page.description)
                    .setColor(color)
                    .setImage(page.image)
                    .setThumbnail(page.thumbnail)
                    .setAuthor({ name: page.author.name, iconURL: page.author.iconURL, url: page.author.url })
                    .addFields({ name: fieldName, value: page.commands.join(', ') });
            };

            const createActionRow = () => {
                const pages = isPrefixHelp ? prefixCommandPages : slashCommandPages;
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('previous1')
                            .setLabel('Previous')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage === 0),
                        new ButtonBuilder()
                            .setCustomId('next2')
                            .setLabel('Next')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage === pages.length - 1),
                        new ButtonBuilder()
                            .setCustomId('prefix')
                            .setLabel(isPrefixHelp ? 'Normal Command List' : 'Excess Command List')
                            .setStyle(ButtonStyle.Secondary)
                    );
            };

            const createDropdown = () => {
                const pages = isPrefixHelp ? prefixCommandPages : slashCommandPages;
                return new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('page-select')
                            .setPlaceholder('Select a page')
                            .addOptions(pages.map((page, index) => ({
                                label: page.title,
                                value: index.toString()
                            })))
                    );
            };

            await interaction.reply({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async (button) => {
                if (button.user.id !== interaction.user.id) return;

                if (button.isButton()) {
                    if (button.customId === 'previous1') {
                        currentPage = (currentPage - 1 + (isPrefixHelp ? prefixCommandPages : slashCommandPages).length) % (isPrefixHelp ? prefixCommandPages : slashCommandPages).length;
                    } else if (button.customId === 'next2') {
                        currentPage = (currentPage + 1) % (isPrefixHelp ? prefixCommandPages : slashCommandPages).length;
                    } else if (button.customId === 'prefix') {
                        isPrefixHelp = !isPrefixHelp;
                        currentPage = 0;
                    }
                } else if (button.isSelectMenu()) {
                    currentPage = parseInt(button.values[0]);
                }

                try {
                    await button.update({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });
                } catch (error) {
                    console.error('Error updating the interaction:', error);
                }
            });

            collector.on('end', async () => {
                try {
                    await interaction.editReply({ components: [] });
                } catch (error) {
                    console.error('Error editing the interaction reply:', error);
                }
            });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#3498db')
                .setTitle(`Click Below to run help command`)
                .addFields(
                  
                    { name: "Get Help: ", value: `</help:1264177192066089013>`, inline: false}
                 )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    }
};
