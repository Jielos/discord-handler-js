module.exports = class Logger {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param message {string} - Success message
     * @returns Process result
     */
    success(message) {
        return console.log(`» ${message}`);
    }

    /**
     * @param message {string} - Info message
     * @returns Process result
     */
    info(message) {
        return console.log(`• ${message}`);
    }

    /**
     * @param message {string} - Error message
     * @returns Process result
     */
    error(message) {
        return console.log(`[!] ${message}`)
    }
}