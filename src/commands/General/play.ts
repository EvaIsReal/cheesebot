import { serverConfig } from "@configs";
import { simpleErrorEmbed } from "@utils/functions";
import { useMainPlayer } from "discord-player";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export default class PlayCommand {

    @Slash({
        name: "play",
        description: "Play a song.",
        guilds: [serverConfig.test_server_id, serverConfig.prod_server_id]
    })

    async onPlay(@SlashOption({ name: "url", description: "The songs url", type: ApplicationCommandOptionType.String }) url: string, 
    interaction: CommandInteraction) {
        const player = useMainPlayer();
        const member = interaction.guild?.members.cache.get(interaction.user.id);

        if(!member?.voice.channel) {
            simpleErrorEmbed(interaction, "You are not connected to a Voice-Channel.")
            return;
        }

        const channel = member.voice.channel;

        player.play(channel, url);
    }
}