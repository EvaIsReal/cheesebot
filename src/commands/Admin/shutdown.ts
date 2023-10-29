import { serverConfig } from "@configs";
import { Category } from "@discordx/utilities";
import { getSimpleSuccessEmbed } from "@utils/functions";
import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
@Category("Admin")
export default class ShutdownCommand {
    @Slash({
        name: "shutdown",
        description: "Shut the bot down",
        guilds: [serverConfig.prod_server_id, serverConfig.test_server_id]
    })
    
    async onShutdown(interaction: CommandInteraction) {
        await interaction.followUp({embeds: [getSimpleSuccessEmbed(interaction, "Shutting down the bot... BAIII!!!")]});
        
        interaction.client.destroy();
        process.exit();
    }
}