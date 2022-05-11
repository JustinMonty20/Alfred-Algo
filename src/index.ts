import { Client, Collection, Intents} from "discord.js";
import { discordConfig } from "../config";
import fs from "fs";

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const { token } = discordConfig; 

client.once("ready", () => {
    console.log("Ready...");
})

const collection = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".ts"));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    collection.set(command.default.data.name, command);
}

client.on("interactionCreate", async interaction => {
    //  for some reason default is before all the information that we need in these objects. 
    if(!interaction.isCommand()) return;

    const command:any = collection.get(interaction.commandName);

    if(!command) return;

    try {
        await command.default.execute(interaction);
    } catch(err) {
        console.error(err);
        await interaction.reply({content: `There was an error while exeucting command with a name of ${interaction.commandName}`, ephemeral: true});
    }
})

client.login(token);