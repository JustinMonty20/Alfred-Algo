// for some reason needed to supply the absolute path here? Never had to do this before idk though.
require("dotenv").config({path: __dirname+ "/.env"});

export const discordConfig =  {
    token: process.env.BOT_TOKEN,
    apiKey: process.env.CMC_API_KEY,
    appId: process.env.APP_ID,
    pubKey: process.env.PUBLIC_KEY,
    guildId: process.env.GUILD_ID,
}