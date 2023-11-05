import { ArgsOf, Client } from "discordx"

import { Discord, Guard, On } from "@decorators"
import { Maintenance } from "@guards"
import { executeEvalFromMessage, isDev, randomNumber } from "@utils/functions"

import { generalConfig, serverConfig } from "@configs"
import { REST, parseEmoji } from "discord.js"
import { Responses } from "./chatEvent/botResponses"
import { injectable } from "tsyringe"
import { Database } from "@services"
import { cwd } from "node:process"

@Discord()
@injectable()
export default class MessageCreateEvent {

    constructor(private db: Database) {}

    @On("messageCreate")
    @Guard(
        Maintenance
    )
    async messageCreateHandler(
        [message]: ArgsOf<"messageCreate">, 
        client: Client
     ) {

        if(message.content.toLowerCase().match("\bwhar\b")) {
            await message.reply("https://tenor.com/view/osaka-azumanga-daioh-azudaioh-osaker-ayumu-kasuga-gif-10912074555985567772");
        }

        if(message.content.toLowerCase() == "what am i") {
            new Responses(this.db).sendSpecialReply(message);
        }

        if(message.channel.id == "1170806125281673296") {
            message.edit(message.content.replace("r", "w"));
        }

        /*
        if(randomNumber(1, 100) == 1) {
            const marf = message.guild?.emojis.cache.find(x => x.name == "marf");
            const marfspeak = message.guild?.emojis.cache.find(x => x.name == "marfspeakwhite")
            await message.reply(`${marf} ${marfspeak}`);
        }*/

        // eval command
        if (
            message.content.startsWith(`\`\`\`${generalConfig.eval.name}`)
            && (
                (!generalConfig.eval.onlyOwner && isDev(message.author.id))
                || (generalConfig.eval.onlyOwner && message.author.id === generalConfig.ownerId)
            )
        ) {
            executeEvalFromMessage(message)
        }

        await client.executeCommand(message, false)
    }

}