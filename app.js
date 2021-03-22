const { Client, Collection } = require('discord.js');

// Requires;
const { readdirSync } = require('fs');
const { join } = require('path');

// Utils;
const MessageFormat = require('./src/utils/MessageFormat');
const Functions = require('./src/utils/Functions');
const Logger = require('./src/utils/Logger');

// Components;
const Commands = require('./src/components/Commands');
const Events = require('./src/components/Events');
const Database = require('./src/components/Database');

class App extends Client {
    constructor() {
        super({ disableMentions: 'everyone' });
        console.log(`--|--- ${new Date()} ---|--`);

        // Requires;
        this.readdirSync = readdirSync;
        this.join = join;

        // Configs;
        this.config = require('./src/resources/config.json');
        this.prefix = this.config["prefix"];
        this.embed = this.config["embed_config"];

        this.launch();
    }

    /**
     * Launch all robot components and then connect the robot to Discord.
     * @returns {Promise<*>}
     */
    async launch() {
        // Data;
        this.commands = new Collection();

        // Utils;
        this.messageFormat = new MessageFormat(this);
        this.functions = new Functions(this);
        this.logger = new Logger(this);

        // Components;
        await new Commands(this).load('./src/commands');
        await new Events(this).load('./src/events');

        this.database = await new Database(this).connect(require('./src/resources/database.json'));
        if(!this.database) {
            await this.logger.error(`Unfortunately, it is impossible to find a pool connection to the database, so it is impossible to launch the robot.`)
            return process.exit();
        } else await this.logger.success('Successful created a pool connection to MySQL database.');

        try {
            await this.login(this.config["token"]);
            await this.logger.success("Connection to Discord successful.");
        } catch (error) {
            await this.logger.error(`Sorry, an error occurred while connecting to Discord.\n >> ${error}`);
            return process.exit(); 
        }
    }
}

module.exports = new App();