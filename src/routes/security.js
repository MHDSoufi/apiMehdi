const security = require("./../controllers/security/index");



module.exports = api => {
    // Route Récupération bearer token avec jwt -> node | 1 mois
    api.route("/api/token").post(security.giveToken);
};
