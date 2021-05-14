const Command = require('../../structure/Command');

class CommandHelp extends Command {
    constructor() {
        super({
            name: 'help',
            usage: 'help (command)',
            description: "Get informations on commands or on a command.",

            category: 'Utilities'
        })

        this.emojis = {
            "Utilities": ":hammer:"
        }
    }

    /**
     * @param client {Client||App} - Discord client
     * @param message {Message} - Message object
     * @param args {string[]} - Array of strings
     *
     * @returns Process result
     */
    async execute(client, message, args) {
        if(!args[1]) {
            const categories = [];
            for(const command of client.commands.values()) {
                if(!categories.includes(command.category)) categories.push(command.category);
            }

            return message.channel.send({
                embed: {
                    title: `Available commands - :label:`,
                    description: `Find all available commands here.\nMore information about a command with **${client.prefix}**help **[commandName]**.`,
                    fields: categories.map(category => {
                        return {
                            name: `${category} - ${this.emojis[category]}`,
                            value: `${client.commands.filter(command => command.category === category).map(command => `\`${command.name}\``).join(', ')} ;`
                        }
                    }),
                    thumbnail: { url: client.user.displayAvatarURL({format: 'png', dynamic: true}) },
                    
                    timestamp: new Date(),
                    url: client.embed["url"],
                    color: client.embed["color"],
                    footer: {
                        icon_url: client.user.displayAvatarURL({format: 'png', dynamic: true}),
                        text: client.embed["footer"]
                    }
                }
            });
        } else {
            const command = client.commands.get(args[1]);
            if(command) {
                return message.channel.send({
                    embed: {
                        title: `Information about command '${command.name}' - :question:`,
                        description: `Find out more about this command below.`,
                        fields: [
                            {
                                name: `Name :label:`,
                                value: `[»](${client.embed["url"]}) ${command.name}`,
                                inline: true
                            },
                            {
                                name: `Usage :question:`,
                                value: `[»](${client.embed["url"]}) ${command.usage}`,
                                inline: true
                            },
                            {
                                name: `Description :bookmark:`,
                                value: `[»](${client.embed["url"]}) ${command.description}`,
                                inline: true
                            },
                            {
                                name: `Category :open_file_folder:`,
                                value: `[»](${client.embed["url"]}) ${command.category}`,
                                inline: true
                            },
                            {
                                name: `Aliases :paperclips:`,
                                value: `[»](${client.embed["url"]}) ${(command.aliases.length > 0 ? command.aliases.map(aliase => `\`${aliase}\``).join(', ') : "No aliases")}`,
                                inline: true
                            },
                            {
                                name: `Permissions :hammer:`,
                                value: `[»](${client.embed["url"]}) ${(command.permissions.length > 0 ? command.permissions.map(permission => `\`${permission}\``).join(', ') : "No permissions needs")}`,
                                inline: true
                            }
                        ],

                        timestamp: new Date(),
                        url: client.embed["url"],
                        color: client.embed["color"],
                        footer: {
                            icon_url: client.user.displayAvatarURL({format: 'png', dynamic: true}),
                            text: client.embed["footer"]
                        }
                    } 
                });
            } else {
                return message.channel.send(client.messageFormat.error(message.author, "sorry but this command does not exist."));
            }
        }
    }
}

module.exports = new CommandHelp();
