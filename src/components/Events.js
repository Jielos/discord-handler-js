module.exports = class Events {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param path {string} - Directory of events
     * @returns Process result
     */
    async load(path) {
        const files = this.client.readdirSync(this.client.join(process.cwd(), path));
        for(const fileName of files) {
            try {
                const fileData = {
                    name: fileName.split('.')[0],
                    file: require(this.client.join(process.cwd(), `${path}/${fileName}`))
                }

                this.client.on(fileData.name, fileData.file.bind(null, this.client));
                delete require.cache[require.resolve(this.client.join(process.cwd(), path, fileName))]
            } catch (error) { throw new Error(error); }
        }

        this.client.logger.info(`Successful events launch, for a total of ${files.length} loaded event(s).`);
    }
}