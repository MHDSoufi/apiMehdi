const security = require("./security")

module.exports = api => {
    // Route Récupération bearer token avec jwt -> node | 1 mois
    security(api);
};