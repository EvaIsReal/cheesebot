import { serverConfig } from "@configs";
import { ContextMenu } from "@decorators";
import { sendMessageLogEmbed } from "@utils/functions";
import { ApplicationCommandType, MessageContextMenuCommandInteraction, PermissionFlagsBits } from "discord.js";
import { Discord } from "discordx";

@Discord()
export default class MessageContextMenu {
    @ContextMenu({
        name: "FlagMessage",
        type: ApplicationCommandType.Message,
        defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
        guilds: [serverConfig.test_server_id, serverConfig.prod_server_id]
    })

    async messageHandler(interaction: MessageContextMenuCommandInteraction) {
        await sendMessageLogEmbed(interaction);
        await interaction.followUp({ephemeral: true, content: "Done!"});
        await interaction.deleteReply();
        await interaction.user.send("`Message was flagged and logged in `" + interaction.guild?.channels.cache.get(serverConfig.bot_log_prod)?.url);
    }
}