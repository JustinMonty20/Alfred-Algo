import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction} from "discord.js";
import axios from "axios";
import { discordConfig } from "../../config";

// max borrow percentage from AlgoFi
const MAX_BORROW = .75;

export default  {
    data: new SlashCommandBuilder()
    .setName("liquidation")
    .setDescription("command to calculate liquidation price of vALGO loan")
    .addIntegerOption(option => 
        option.setName("provided")
        .setDescription("Algo provided to the AlgoFi governers vault")
        .setRequired(true))
    .addIntegerOption(option => 
        option.setName("borrow")
        .setDescription("(whole number that will be turned into %) how much of your loan are you looking to borrow against")
        .setRequired(true)
        ),    

    async execute(interaction:BaseCommandInteraction) {
        const {data, coinId} = await getCoinPrice("4030");
        const price = data.data[`${coinId}`].quote.USD.price;

        const liquidationPrice = calculateLiquidation(interaction.options.data[0].value as number, interaction.options.data[1].value as number ,price)
        await interaction.reply({content: `Liquidation price: ${liquidationPrice.toFixed(2)}`, ephemeral: true})
    }
}

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
