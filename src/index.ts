/**
 * TODO: Set up implementation with discord.js for AlgoBot
 */
import { Client, Intents} from "discord.js";
import config from "../config"; 

const client = new Client({intents: Intents.FLAGS.GUILDS});
const { token } = config; 

client.once("ready", () => {
    console.log("Ready...");
})

client.login(token);