module.exports = class Command {
    /**
     * @param data {{name: string, usage: string, description: string, category: string, aliases: string[], permissions: string[]}}
     */
    constructor(data) {
        this.name = data["name"];
        this.usage = data["usage"] || data["name"];
        this.description = data["description"];

        this.category = data["category"];
        this.aliases = data["aliases"] || [];

        this.permissions = data["permissions"] || [];
    }
}