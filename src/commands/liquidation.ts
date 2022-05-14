import {SlashCommand, CommandOptionType, SlashCreator, CommandContext, CommandIntegerOption, AnyCommandOption} from "slash-create";
import axios from "axios";
import { discordConfig } from "../../config";

// // max borrow percentage from AlgoFi
const MAX_BORROW = .75;

class LiqCmd extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            guildIDs: [discordConfig.guildId!],
            name: "liq",
            description: "calculates liquidation price of vALGO loan",
            deferEphemeral: true,
            options: [{
                type: CommandOptionType.INTEGER,
                required: true,
                name: "provided",
                description: "Algo provided to AlgoFi governers vault" 
            }, {
                type: CommandOptionType.INTEGER,
                required: true,
                name: "borrow",
                description: "how much of your loan are you willing to borrow against. (percentage)"
            }]
        })

        this.filePath = __filename;
    }

    async run(ctx: CommandContext) {
        const {data: {data: cmdData}} = ctx;
        const {data, coinId} = await getCoinPrice("4030");
        const price = data.data[`${coinId}`].quote.USD.price;

        const option =  cmdData.options as CommandIntegerOption[];
        const provided = option[0].value;
        const borrowed = option[1].value;

        ctx.send(`Potential liquidation at ${calculateLiquidation(provided, borrowed, price).toFixed(2)} per Algo`, {ephemeral: true});
    }
}

export default LiqCmd


//  async execute(interaction:BaseCommandInteraction) {
//         const {data, coinId} = await getCoinPrice("4030");
//         const price = data.data[`${coinId}`].quote.USD.price;

//         const liquidationPrice = calculateLiquidation(interaction.options.data[0].value as number, interaction.options.data[1].value as number ,price)
//         await interaction.reply({content: `Liquidation price: ${liquidationPrice.toFixed(2)}`, ephemeral: true})
//     }
// }

const getCoinPrice = async (id: string) => {
    const resp = await axios(`${discordConfig.cmcBaseUrl}/cryptocurrency/quotes/latest?id=${id}`, {
        headers: {
            "Accepts": "application/json",
            "X-CMC_PRO_API_KEY": discordConfig.apiKey!,
        },
    });
    return {
        coinId: id,
        data: resp.data,
    };
}

const calculateLiquidation = (algoProvided: number, borrowPercentage: number, price: number) => {
    const maxBorrowAmount = algoProvided * MAX_BORROW;
    const borrowPercent = borrowPercentage / 100;
    const usdAlgo = maxBorrowAmount * price;

    const projectedBorrowAmountUSD = usdAlgo * borrowPercent;

    return projectedBorrowAmountUSD / maxBorrowAmount
}
