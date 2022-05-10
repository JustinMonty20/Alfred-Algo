import { Client, Intents} from "discord.js";
import { discordConfig } from "../config";


const client = new Client({intents: Intents.FLAGS.GUILDS});
const { token } = discordConfig; 

client.once("ready", () => {
    console.log("Ready...");
})

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const {commandName} = interaction;

    switch(commandName) {
        case "test":
            await interaction.reply("Testing 123...");
    }
})

client.login(token);