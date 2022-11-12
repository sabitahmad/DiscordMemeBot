const {ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder} = require("discord.js");

module.exports = {
    name: 'cancer',
    description: "Send cancer meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 5000,
    options: [
        {
            name: 'user',
            description: 'User to generate',
            type: ApplicationCommandOptionType.User,
            required: true
        },

    ],
    run: async (client, interaction) => {

        const user = interaction.options.get('user')?.user || interaction.user;
        const avatar = user.displayAvatarURL({extension: "png"})
        await interaction.deferReply()
        await client.memer.cancer(avatar).then(async image => {

            const attachment = new AttachmentBuilder(image, {name: 'cancer.png'})

            const embed = new EmbedBuilder()
                .setTitle(`Meme for ${user.tag}`)
                .setColor('NotQuiteBlack')
                .setImage('attachment://cancer.png')
                .setFooter({text: `Executed by ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()
            await interaction.editReply({embeds: [embed], files: [attachment]})

        })


    }
}