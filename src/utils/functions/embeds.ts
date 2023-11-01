import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Embed, EmbedBuilder, Interaction, MessageActionRowComponentBuilder, MessageContextMenuCommandInteraction, TextBasedChannel } from "discord.js"

import { replyToInteraction } from "@utils/functions"
import { serverConfig } from "@configs"
/**
 * Send a simple success embed
 * @param interaction - discord interaction
 * @param message - message to log
 */
export const simpleSuccessEmbed = (interaction: CommandInteraction, message: string) => {

    const embed = new EmbedBuilder()
        .setColor(0x57f287) // GREEN // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
        .setTitle("SUCCESS")
        .setDescription(`✅ ${message}`)

    replyToInteraction(interaction, { embeds: [embed] })
}

/**
 * Send a simple error embed
 * @param interaction - discord interaction
 * @param message - message to log
 */
export const simpleErrorEmbed = (interaction: CommandInteraction, message: string) => {

    const embed = new EmbedBuilder()
        .setColor(0xed4245)
        .setTitle("ERROR") // RED // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
        .setDescription(`❌ ${message}`)

    replyToInteraction(interaction, { embeds: [embed] })
}

export const getSimpleErrorEmbed = (interaction: CommandInteraction, message: String) => {
    return new EmbedBuilder()
        .setColor(0xed4245)
        .setTitle("ERROR") // RED // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
        .setDescription(`❌ ${message}`)
}

export const getSimpleSuccessEmbed = (interaction: CommandInteraction, message: String) => {
    return new EmbedBuilder()
    .setColor(0x57f287) // GREEN // see: https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Colors.js
    .setTitle("SUCCESS")
    .setDescription(`✅ ${message}`)
}

export const sendMessageLogEmbed = async (interaction: MessageContextMenuCommandInteraction) => {
    if(interaction.guild?.id == serverConfig.test_server_id) {

    } else {
        const guild = interaction.guild;
        const channel = guild?.channels.cache.get(serverConfig.bot_log_prod);

        const embed = new EmbedBuilder()
            .setTitle("MESSAGE FLAGGED")
            .setDescription(`A message from <@${interaction.targetMessage.author.id}> has been flagged by <@${interaction.user.id}>!`)
            .setColor(0xfcba03)
            .addFields({name: "Message", value: interaction.targetMessage.content, inline: true})
            .setTimestamp()
            .setThumbnail("https://st2.depositphotos.com/1001189/10099/v/450/depositphotos_100996864-stock-illustration-exclamation-point-danger-sign.jpg");

        const jumpButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Jump to Message")
            .setURL(interaction.targetMessage.url)
        
        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            jumpButton,
          )

            if(channel?.isTextBased()) {
                await channel.send({ embeds: [embed], components: [row] })
            }

    }
}

export const lockdownLogEmbed = async (interaction: CommandInteraction) => {
    const guild = interaction.guild;
        const channel = guild?.channels.cache.get(serverConfig.bot_log_prod);

        const embed = new EmbedBuilder()
            .setTitle("MESSAGE FLAGGED")
            .setDescription(`The channel <#${interaction.channel?.id}> has been locked down by <@${interaction.user.id}>!`)
            .setColor(0xfcba03)
            .setTimestamp()
            .setThumbnail("https://st2.depositphotos.com/1001189/10099/v/450/depositphotos_100996864-stock-illustration-exclamation-point-danger-sign.jpg");

            if(channel?.isTextBased()) {
                await channel.send({embeds: [embed]})
            }

}

export const lockdownRemoveEmbed = async (interaction: CommandInteraction) => {
    const guild = interaction.guild;
        const channel = guild?.channels.cache.get(serverConfig.bot_log_prod);

        const embed = new EmbedBuilder()
            .setTitle("MESSAGE FLAGGED")
            .setDescription(`The channel <#${interaction.channel?.id}> has been unlocked by <@${interaction.user.id}>!`)
            .setColor(0xfcba03)
            .setTimestamp()
            .setThumbnail("https://st2.depositphotos.com/1001189/10099/v/450/depositphotos_100996864-stock-illustration-exclamation-point-danger-sign.jpg");

        if(channel?.isTextBased()) {
            await channel.send({embeds: [embed]})
        }
}