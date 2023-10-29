import { BotResponse } from "@entities";
import { Database } from "@services";
import { Message } from "discord.js";
import { injectable } from "tsyringe";

export class Responses {

    constructor(private db: Database) {}

    async sendSpecialReply(message: Message) {

        const responses = this.db.get(BotResponse);
        const response = await responses.findOne({ id: message.author.id });

        if(response) {
            await message.reply(response.message);
        }
    }

}