const {ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder} = require("discord.js");

module.exports = {
    name: 'brazzers',
    description: "Send brazzers meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 5000,
    options: [
        {
            name: 'user',
            description: 'The user you want meme about',
            type: ApplicationCommandOptionType.User,
        },

    ],
    run: async (client, interaction) => {

        const user = interaction.options.get('user')?.user || interaction.user;
        const avatar = user.displayAvatarURL({ extension: "png"})
        await interaction.deferReply()

        await client.memer.brazzers(avatar).then(async image => {

            const attachment = new AttachmentBuilder(image, {name: 'affect.png'})

            const embed = new EmbedBuilder()
                .setTitle(`Meme for ${user.tag}`)
                .setColor('Fuchsia')
                .setImage('attachment://affect.png')
                .setFooter({text: `Executed by ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()
            await interaction.editReply({embeds: [embed], files: [attachment]})

        }).catch(async err => {
            const embed = new EmbedBuilder()
                .setTitle(`Error`)
                .setColor('Red')
                .setDescription(`Error occurred ${err}`)
                .setFooter({text: `Executed by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
                .setTimestamp()

            await interaction.editReply({embeds: [embed]})
        })


    }
}