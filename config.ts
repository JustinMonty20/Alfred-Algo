import { config }  from "dotenv";
config();

export default {
    token: process.env.BOT_TOKEN,
    apiKey: process.env.CMC_API_KEY,
    appId: process.env.APP_ID,
    pubKey: process.env.PUBLIC_KEY,
    guildId: process.env.GUILD_ID,
}