import { SlashCommand, SlashCreator, CommandContext } from "slash-create";
class TestCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "test",
            description: "A test command with slash-create package",
            deferEphemeral: true,
        });

        this.filePath = __filename;
    }

    async run(ctx:CommandContext) {
        console.log(ctx);
        return "TESTING, TESTING 123...";
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