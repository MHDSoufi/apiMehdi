const verif = require("../verif/index"),
    status = require("../status/index"),
    jwt = require("jsonwebtoken");
module.exports = {
    emailFormat: (email) => {
        return (
            email === undefined ||
            email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null
        ) ? false : (email.length > 10) ? true : false;
    },
    passwordFormat: (password) => {
        return (
            password === undefined ||
            password.match(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/) == null
        ) ? false : (password.length >= 6) ? true : false;
    },
    integerFormat: (int) => {
        return (
            int === undefined ||
            int.match(/^(?=.*[0-9])/) == null
        ) ? false : (int.length <= 10) ? true : false;
    },
    stringFormat: (string, number) => {
        return (
            string === undefined ||
            string.match(/^(?=.*[a-z])/) == null
        ) ? false : (string.length <= number) ? true : false;
    },
    imagebase64: async(string) => {
        return (string === undefined || string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) === null) ? false : true;
    },
    tokenFilter: async(res, data, secret) => {
        let error = false;
        try {
            jwt.verify(data, secret);
        } catch (e) {
            error = true;
        }
        const decoded = await verif.token(res, data);
        const verify = await verif.level(decoded.level, 0);
        return error;
    },
    tokenpublic: async(req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decodedToken = jwt.verify(token, config.publicToken);
            console.log(decodedToken.public);
            if (decodedToken.public == "publcToken")
                return true;
            else
                return status.sendReturn(res, 401, { error: true, message: "Token Invalide !" });
        } catch {
            return status.sendReturn(res, 401, { error: true, message: "Token Invalide !!" });
        }
    }
};