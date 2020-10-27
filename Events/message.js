module.exports = (Client, Message) => {
    if(Message.author.bot) return;

    if(!Message.content.startsWith(Client.Prefix)) return;
    const Ctx = { message: Message, args: Message.content.slice(Client.Prefix.length).trim().split(/ +/g) }
    const Command = Client.Commands.find(Command => Command.Aliases.includes(Ctx.args[0].toLowerCase())) || Client.Commands.get(Ctx.args[0].toLowerCase());

    if(!Command) return;
    if(!Client.Functions.checkPerms(Command, Message.member)) {
        return Client.Functions.noPermission(Message.user, Message.channel);
    }

    try { Command.Execute(Client, Ctx); }
    catch (Error) { throw new Error(error); }
};
