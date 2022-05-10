import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { discordConfig } from "../config";
const {appId, guildId, token} = discordConfig;

const commands = [
    new SlashCommandBuilder().setName('test').setDescription('test command description'),
]
.map(cmd => cmd.toJSON());

const rest = new REST({version: "9"}).setToken(token!);
rest.put(Routes.applicationGuildCommands(appId!, guildId!), {body: commands})
.then(() => console.log("Successfully registered commands"))
.catch(console.error)

