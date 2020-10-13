const cors = require("cors"), // CORS est un package node.js pour fournir un middleware sous Express qui peut être utilisé pour activer CORS avec diverses options.
    express = require("express"),
    route = require("./src/routes"), // Apport des route créé
    config = require("./src/config"),
    bodyParser = require("body-parser"),
    api = express();

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

api.use(cors());

api.use(bodyParser.urlencoded({
    extended: true
}));

api.use(bodyParser.json());

route(api);

api.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname + "/public/index.html"));
});

api.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError")
        res.status(401).send("Missing authentication credentials.");
});

api.listen(process.env.PORT || config.server.port, err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(
        `API Tourne ${config.server.port} in ${config.server.env} mode \n Lancé le site web sur votre navigateur ${config.server.port}`
    );
});
