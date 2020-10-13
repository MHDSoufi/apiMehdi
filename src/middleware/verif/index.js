const sql = require("../../model/sql/index.js"),
    decode = require("jwt-decode"),
    status = require("../status/index");


module.exports = {
    token: async(res, token) => {
        try {
            return token = decode(token);
        } catch (e) {
            return status.sendReturn(res, 400, { error: true, message: "Token Invalide" });
        }
    },
    tokenPublic: async(req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
            const userId = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw "Invalid user ID";
            } else {
                next();
            }
        } catch {
            res.status(401).json({
                error: new Error("Invalid request!")
            });
        }
    },
    level: async(level, droit) => {
        if (level >= droit || level == undefined)
            return true;
        else
            return false;
    },
    vide: async(data) => {
        if (data == undefined || data.trim().length == 0)
            return false;
        else
            return true;
    },
    emailExiste: async(table, data, res) => {
        let toReturn = false;
        toReturn = await new Promise(resolve => {
            sql.select(table, data, (error, results) => {
                console.log(results.length);
                resolve((results.length > 0) ? true : false);
            });
        });
        return toReturn;
    },
    lastconnect: async(res, req, essaie, lastlogin, table, where, email) => {
        if (essaie >= 5 && ((new Date() - lastlogin) / 1000 / 60) <= 3) {
            status.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + email + " - Veuillez patientez 3 min" });
        } else {
            toUpdate = {
                lastlogin: new Date(),
                attempt: essaie + 1
            };
            sql.update(table, where + "'" + email + "'", toUpdate, (error, results) => {
                if (error != null) {
                    status.sendReturn(res, 401, { error: true, message: "Requête impossible", sql: "update" });
                } else
                    status.sendReturn(res, 401, { error: true, message: "Votre Email/Password est incorrect" });
            });
        }
    }
};