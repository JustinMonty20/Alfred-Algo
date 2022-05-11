import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";

import { discordConfig } from "../config";
const {appId, guildId, token} = discordConfig;

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token!);

rest.put(Routes.applicationGuildCommands(appId!, guildId!), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
