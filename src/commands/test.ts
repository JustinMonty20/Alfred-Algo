import { SlashCommand, SlashCreator, CommandContext } from "slash-create";
import {discordConfig } from "../../config";
class TestCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            guildIDs: [discordConfig.guildId!],
            name: "test",
            description: "A test command with slash-create package",
            deferEphemeral: true,
        });

        this.filePath = __filename;
    }

    async run(ctx:CommandContext) {
        ctx.send("TESTING, TESTING 123...", {ephemeral: true});
    }
}

export default TestCommand



// export default  {
//     data: new SlashCommandBuilder()
//     .setName("test")
//     .setDescription("a test command"),

//     async execute(interaction:BaseCommandInteraction) {
//         await interaction.reply("Testing 123...")
//     }
// }