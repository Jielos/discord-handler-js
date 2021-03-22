module.exports = class Commands {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param path {string} - Directory of commands
     * @returns Process result
     */
    async load(path) {
        const dirs = this.client.readdirSync(this.client.join(process.cwd(), path));
        for(const dirName of dirs) {
            const files = this.client.readdirSync(this.client.join(process.cwd(), `${path}/${dirName}`));
            for(const fileName of files) {
                const fileData = require(this.client.join(process.cwd(), `${path}/${dirName}/${fileName}`));
                this.client.commands.set(fileData.name, fileData);
                delete require.cache[require.resolve(this.client.join(process.cwd(), `${path}/${dirName}`, fileName))];
            }
        }

        this.client.logger.info(`Successful launch of commands, for a total of ${this.client.commands.size} loaded commands.`);
    }
}