const mysql= require('mysql2/promise');

module.exports = class Database {
    /**
     * @param client {Client||App} - Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param data {{host: string, port: int, database: string, user: string, password: string, charset: string}}
     */
    async connect(data) {
        try {
            const pool = await mysql.createPool(data);
            await pool.getConnection();
            
            return pool;
        } catch (error) {
            return this.client.logger.error(`An error occurred while creating a pool connection to the MySQL database.\n >> ${error}`);
        }
    }
}