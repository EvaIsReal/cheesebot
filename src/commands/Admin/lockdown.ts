import { serverConfig } from "@configs";
import { Category } from "@discordx/utilities";
import { lockdownLogEmbed, simpleErrorEmbed, simpleSuccessEmbed } from "@utils/functions";
import { ApplicationCommandOptionType, CommandInteraction, GuildChannel, PermissionFlagsBits } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import fastFolderSize from "fast-folder-size";

@Discord()
@Category("Admin")
export default class LockdownCommand {

    @Slash({
        name: "lockdown",
        description: "Lock down every public text channel in case of emergency.",
        defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
        guilds: [serverConfig.prod_server_id, serverConfig.test_server_id]
    })

    async onLockdown(
        @SlashOption({
            name: "channel",
            description: "A specific channel",
            type: ApplicationCommandOptionType.Channel,
            required: false
        })
        channel: GuildChannel,
        interaction: CommandInteraction
    ) {
        const allowed = false;

            if(!allowed) {
                simpleErrorEmbed(interaction, "This feature is currently not allowed.");
                return;
            }

        const userRole = interaction.guild?.roles.cache.get("1147728513437286491");
        if(userRole) {
            channel.permissionOverwrites.edit(userRole, { SendMessages: false })

            simpleSuccessEmbed(interaction, "This channel has been locked down. Please don't continue this conversation!");
            await lockdownLogEmbed(interaction);
        }

    }

}