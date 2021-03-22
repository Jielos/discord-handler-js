module.exports = class Functions {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param member {GuildMember} - Member who execute the command
     * @param command {Command} - Command class
     *
     * @returns {boolean}
     */
    hasPermissions(member, command) {
        if(!command.permissions) return true;
        return member.permissions.has(command.permissions);
    }
}