const { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'changemymind',
    description: "Generate changemymind meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 5000,
    options: [
        {
            name: 'text',
            description: 'Input Change My Mind text',
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],
    run: async (client, interaction) => {
        await interaction.deferReply()

        client.memer.changemymind(interaction.options.get('text').value).then(async image => {

            const attachment = new AttachmentBuilder(image, {name: 'changemymind.png'})

            const embed = new EmbedBuilder()
                .setTitle(`Meme for ${interaction.user.tag}`)
                .setColor('Orange')
                .setImage('attachment://changemymind.png')
                .setFooter({text: `Executed by ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()

            await interaction.editReply({embeds: [embed], files: [attachment]})

        }).catch(async err => {

            const embed = new EmbedBuilder()
                .setTitle(`Error`)
                .setColor('Red')
                .setDescription(`Error occurred ${err}`)
                .setFooter({text: `Executed by ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()

            await interaction.editReply({embeds: [embed]})

        })

    }
};