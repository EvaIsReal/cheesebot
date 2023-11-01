import { serverConfig } from "@configs";
import { Discord, Slash, SlashOption } from "@decorators";
import { lockdownRemoveEmbed, simpleErrorEmbed, simpleSuccessEmbed } from "@utils/functions";
import { ApplicationCommandOptionType, CommandInteraction, GuildChannel, PermissionFlagsBits } from "discord.js";

@Discord()
export default class UnlockCommand {

    @Slash({
        name: "unlock-channel",
        description: "Unlock a previously locked down channel.",
        defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
        guilds: [serverConfig.test_server_id, serverConfig.prod_server_id]
    })

    async onUnlock(
        @SlashOption({
        name: "channel",
        description: "A specific channel",
        type: ApplicationCommandOptionType.Channel,
        required: false
    })
    channel: GuildChannel, interaction: CommandInteraction) {

        const allowed = false;

            if(!allowed) {
                simpleErrorEmbed(interaction, "This feature is currently not allowed.");
                return;
            }

        const userRole = interaction.guild?.roles.cache.get("1147728513437286491");
        if(userRole) {
            channel.permissionOverwrites.edit(userRole, { SendMessages: false })

            simpleSuccessEmbed(interaction, "This channel has been unlocked.");
            await lockdownRemoveEmbed(interaction);
            
        }


    }

}