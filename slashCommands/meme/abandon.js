const { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'abandon',
    description: "Generate abandon meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'text',
            description: 'Input abandon text',
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],
    run: async (client, interaction) => {
        await interaction.deferReply()

        client.memer.abandon(interaction.options.get('text').value).then(async image => {

            const attachment = new AttachmentBuilder(image, {name: 'abandon.png'})

            const embed = new EmbedBuilder()
                .setTitle(`Meme for ${interaction.user.tag}`)
                .setColor('Greyple')
                .setImage('attachment://abandon.png')
                .setFooter({text: `Executed by ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()

            await interaction.editReply({embeds: [embed], files: [attachment]})

        }).catch(async err => {
            await interaction.editReply('Error' + err)

        })

    }
};