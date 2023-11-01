import { serverConfig } from "@configs";
import { BotResponse } from "@entities";
import { Database } from "@services";
import { simpleSuccessEmbed } from "@utils/functions";
import { ApplicationCommandOptionType, CommandInteraction, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { injectable } from "tsyringe";

@Discord()
@injectable()
export default class SetBotResponseCommand {

    constructor(private db: Database) {}

    @Slash({
        name: "call-me-the-thing",
        description: "Choose what the bot should reply to \"What am I\".",
        guilds: [serverConfig.prod_server_id, serverConfig.test_server_id]
    })

    async onResponseRegister(
        @SlashOption({
            name: "response",
            description: "Your desired response",
            required: true,
            type: ApplicationCommandOptionType.String
        }) message: string,
        interaction: CommandInteraction
    ) {
        const responseRepo = this.db.get(BotResponse);


        let userBotResponse = await responseRepo.findOne({ id: interaction.user.id });

        if(!userBotResponse) {
            userBotResponse = new BotResponse();
            userBotResponse.id = interaction.user.id;
        }
        
        userBotResponse.message = message;

        await responseRepo.persistAndFlush(userBotResponse);

        simpleSuccessEmbed(interaction, `Set new bot response for <@${interaction.user.id}>`);
    }
}