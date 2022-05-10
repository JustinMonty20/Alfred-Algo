import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction} from "discord.js";


export default  {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("a test command"),

    async execute(interaction:BaseCommandInteraction) {
        await interaction.reply("Testing 123...")
    }
}