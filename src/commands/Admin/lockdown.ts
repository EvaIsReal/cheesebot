import { Category } from "@discordx/utilities";
import { simpleErrorEmbed } from "@utils/functions";
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
@Category("Admin")
export default class LockdownCommand {

    @Slash({
        name: "lockdown",
        description: "Lock down every public text channel in case of emergency.",
        defaultMemberPermissions: [PermissionFlagsBits.BanMembers]
    })

    onLockdown(interaction: CommandInteraction) {
        const allowed = false;

        if(!allowed) {
            simpleErrorEmbed(interaction, "This feature is currently not allowed.");
            return;
        }

    }

}