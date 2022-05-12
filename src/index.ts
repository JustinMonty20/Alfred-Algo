import {SlashCreator, GatewayServer} from "slash-create";
import path from "path";
import * as Discord from "discord.js";

import { discordConfig } from "../config";

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS]});
const creator = new SlashCreator({
    applicationID: discordConfig.appId || "appId",
    publicKey:  discordConfig.pubKey || "pubKey",
    token: discordConfig.token || "token",
    client
})

creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on("INTERACTION_CREATE", handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, "commands"), [".ts"])
    .syncCommands()

client.once("ready", () => {
    console.log("Ready...");
})

console.log(creator.commands)

client.login(discordConfig.token);