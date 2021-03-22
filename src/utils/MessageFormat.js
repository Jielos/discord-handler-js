module.exports = class MessageFormat {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param user {User} - User object
     * @param message {string} - Message string
     *
     * @returns {string}
     */
    success(user, message) {
        return `${this.client.config.messageFormat.emojis["success"]} | **${user.username}**, ${message}`;
    }

    /**
     * @param user {User} - User object
     * @param message {string} - Message string
     *
     * @returns {string}
     */
    error(user, message) {
        return `${this.client.config.messageFormat.emojis["error"]} | **${user.username}**, ${message}`;
    }
}