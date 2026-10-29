
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    ChannelType
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`👑 Deluxe Bot Aktif: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // 1. KURALLAR
    if (message.content === '!kurallar') {
        const rulesEmbed = new EmbedBuilder()
            .setTitle('📜 Deluxe Community Rules')
            .setColor('#2b2d31')
            .setDescription(
                '🚫 **1. No Self-Promotion or Advertising**\n' +
                'Do not advertise servers, products, services, or other communities without permission.\n\n' +

                '📵 **2. No Spam or Chat Flooding**\n' +
                'Avoid repeated messages, excessive emojis, and unnecessary message flooding.\n\n' +

                '⚠️ **3. Respect All Members**\n' +
                'Harassment, threats, insults, or toxic behavior toward other members are not allowed.\n\n' +

                '🤝 **4. No Hate Speech or Discrimination**\n' +
                'Racism, sexism, hate speech, and discrimination of any kind are strictly forbidden.\n\n' +

                '🛡️ **5. No Malicious Content**\n' +
                'Sharing malware, viruses, suspicious links, or harmful files is prohibited.\n\n' +

                '📬 **6. No Unwanted Direct Messages**\n' +
                'Do not send unsolicited DMs for advertising, spam, or harassment. Respect everyone\'s privacy.\n\n' +

                '📖 **7. Follow Discord\'s Rules**\n' +
                'All members must follow Discord\'s Terms of Service and Community Guidelines.\n\n' +

                '⚖️ **8. Follow Staff Instructions**\n' +
                'Respect moderators and follow their instructions. Rule violations may result in warnings, mutes, or bans.'
            );

        await message.channel.send({ embeds: [rulesEmbed] });
    }

    // 2. TICKET
    if (message.content === '!ticket-kur') {
        const ticketEmbed = new EmbedBuilder()
            .setTitle('🎫 Deluxe Support')
            .setColor('#2b2d31')
            .setDescription('Select a category below to open a ticket.');

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select a ticket type')
            .addOptions([
                { label: 'Genel Destek', value: 'ticket_general', emoji: '❓' },
                { label: 'Sorun / Hata Bildirimi', value: 'ticket_report', emoji: '⚠️' }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);
        await message.channel.send({ embeds: [ticketEmbed], components: [row] });
    }

    // 3. DOWNLOAD
    if (message.content === '!download-kur') {
        const downloadEmbed = new EmbedBuilder()
            .setTitle('📦 Deluxe Client v0.0.9.8+mc1.21.11')
            .setColor('#1e1f22')
            .setDescription('Aşağıdaki **Download Client** butonuna basarak doğrudan dosyayı indirebilirsiniz.');

        const btnDownload = new ButtonBuilder()
            .setCustomId('btn_download')
            .setLabel('Download Client')
            .setStyle(ButtonStyle.Success)
            .setEmoji('📥');

        const row = new ActionRowBuilder().addComponents(btnDownload);
        await message.channel.send({ embeds: [downloadEmbed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
        const ticketChannel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
            ],
        });

        await ticketChannel.send({
            content: `Merhaba ${interaction.user}, talebiniz alındı!`
        });

        await interaction.reply({
            content: `✅ Ticket açıldı: ${ticketChannel}`,
            ephemeral: true
        });
    }

    if (interaction.isButton() && interaction.customId === 'btn_download') {
        await interaction.reply({
            content: '🎉 İndirme Bağlantınız: https://www.mediafire.com/file/7opavmxsje8zkg5/Deluxe_Client_0_9_9_1_%25284%2529.jar/file',
            ephemeral: true
        });
    }
});

// BOT TOKEN
client.login('BOT TOKEN');
