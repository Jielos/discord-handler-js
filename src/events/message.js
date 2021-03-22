/**
 * @param client {Client||App} - Discord Client
 * @param message {Message}
 *
 * @returns Process result
 */
module.exports = async(client, message) => {
    // Returns the code if the author of the message is a bot;
    if(message.author.bot) return;

    // Continue the code if the content of message starts with the bot's prefix;
    if(message.content.startsWith(client.prefix)) {
        // Define the command and args;
        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const command = client.commands.find(command => command.aliases.includes(args[0].toLowerCase())) || client.commands.get(args[0].toLowerCase());

        // Returns the code if the command cannot be found;
        if(!command) return;

        // Returns the code and an error message if the user does not have permissions to run the command.
        if(!client.functions.hasPermissions(message.member, command)) return message.channel.send(client.messageFormat.error(message.author, "sorry but you do not have sufficient permissions."));

        // Execute the command;
        try { await command.execute(client, message, args); }
        catch (error) { throw new Error(error); }
    }
}
