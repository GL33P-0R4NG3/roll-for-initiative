const fs = require('node:fs');
const { Events, VoiceState, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * Handle function
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
    async execute(oldState, newState) {
        /*if (newState.channelID && !oldState.channelID) {
            console.log('Someone joined');
        } else if (oldState.channelID && !newState.channelID) {
            console.log('Someone left');
        } else {
            console.log('Neither of the two actions occured');
        }*/

        let path = `servers/${oldState.guild.id}`;
        let file = fs.readFileSync(`${path}/config.json`);
        let config = JSON.parse(file);
        //let config = JSON.stringify(file);

        //if (!config.privateChannels.initChannelVoice && !config.DnD.initChannelVoice) return;

        if (config.DnD.initChannelVoice == newState.channelId) {
            newState.guild.channels.create({
                name: `${newState.member.displayName}'s Session`,
                type: ChannelType.GuildVoice,
                userLimit: 1,
                parent: newState.channel.parent,
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        deny: [PermissionsBitField.Flags.Connect],
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: newState.member.id,
                        allow: [
                            PermissionsBitField.Flags.Connect,
                            PermissionsBitField.Flags.ManageChannels,
                            PermissionsBitField.Flags.ViewChannel
                        ],
                    }
                ],
            }).then(sessionChannel => {
                console.log(`Channel ${sessionChannel.name}<${sessionChannel.id}> Successfuly created!`);

                let chan = {
                    id: sessionChannel.id,
                    members: [newState.member.id],
                    waitRoom: {},
                    supportChannels: [],
                    delete: false,
                    deleteTime: ""
                }

                sessionChannel.guild.channels.create({
                    name: `🛎️ Doorbell 🛎️`,
                    type: ChannelType.GuildVoice,
                    parent: newState.channel.parent,
                    permissionOverwrites: [
                        {
                            id: newState.guild.id,
                            deny: [PermissionsBitField.Flags.Connect],
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: newState.member.id,
                            allow: [
                                PermissionsBitField.Flags.Connect,
                                PermissionsBitField.Flags.ManageChannels,
                                PermissionsBitField.Flags.ViewChannel
                            ],
                        }
                    ],
                }).then(waitChannel => {
                    chan.waitRoom = {
                        id: waitChannel.id,
                        whitelist: [],
                        autojoin: config.autojoin
                    }
                    config.DnD.channels.push(chan);
                    fs.writeFile(`${path}/config.json`, JSON.stringify(config, null, "\t"), (err) => { console.log(`Config saved!`) });

                    console.log(`Moving user...`);
                    newState.member.voice.setChannel(sessionChannel);
                });
            });
        } else if (config.privateChannels.initChannelVoice == newState.channelId) {
            // stuff to do for private init channel
            newState.guild.channels.create({
                name: `${newState.member.displayName}'s Room`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parent,
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        deny: [PermissionsBitField.Flags.Connect],
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: newState.member.id,
                        allow: [
                            PermissionsBitField.Flags.Connect,
                            PermissionsBitField.Flags.ManageChannels,
                            PermissionsBitField.Flags.ViewChannel
                        ],
                    }
                ],
            }).then(newChannel => {
                console.log(`Channel ${newChannel.name}<${newChannel.id}> Successfuly created!`);

                chan = {
                    id: newChannel.id,
                    members: [newState.member.id],
                    delete: false,
                    deleteTime: ""
                }
                config.privateChannels.channels.push(chan);
                fs.writeFile(`${path}/config.json`, JSON.stringify(config, null, "\t"), (err) => { console.log(`Config saved!`) });
                
                console.log(`Moving user...`);
                newState.member.voice.setChannel(newChannel);
            });
        } else {
            // stuff to do for other channels 
        }

        //console.log(file);
        //console.log(config);
        //console.log(config["prefix"]);
        //console.log(config.prefix);

        //for (const channels of config)
    },
};