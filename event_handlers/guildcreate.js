const fs = require('node:fs');
const { Events, Guild } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    /**
     * Handle function
     * @param {Guild} guild 
     */
    async execute(guild) {
        let path = `servers/${guild.id}`;
        console.log(`Creating new config file... ${path}/config.json`);
        fs.mkdirSync(path);
        fs.copyFileSync(`./servers/template.json`, `${path}/config.json`);
        //let config = fs.readFileSync(`${path}/config.json`);
        //config.toJSON();
        //fs.writeFileSync(`${path}/config.json`, config);
    },
};