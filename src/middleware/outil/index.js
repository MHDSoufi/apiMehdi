const filter = require("../filter/index"),
    bcrypt = require("bcrypt"),
    status = require("../status"),
    nodemailer = require("nodemailer"),
    config = require("../../config/index"),
    fs = require("fs"),
    mime = require("mime"),
    NodeGeocoder = require("node-geocoder");

module.exports = {
    email: async(email, sujet, html) => {
        console.log(config.email);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: config.email.secure, // true for 465, false for other ports
            auth: {
                user: config.email.auth.user, // email
                pass: config.email.auth.pass, // password
            },
        });

        // send mail with defined transport object
        console.log(email);
        transporter.sendMail({
            from: config.email.auth.user, // sender address
            to: email, // list of receivers
            subject: sujet, // Subject line
            // text: "Vous avez lancer une procédure de récupération de mot de passe. Voilà un mot de passe de remplacement qui vous permettra de vous connecter à votre compte, et lors de votre première connection vous pourrez le changer de nouveau. Votre nouveau mot de passe est : " + mdp,
            html: html
        });
    },
    verifloginpassword: async(email, password) => {
        if (filter.emailFormat(email) == false || filter.exist(password) == false) {
            return status.sendReturn(res, 401, { error: true, message: "L'email/password not correct", data: data });
        }
    },
    hashSecurity: async(result) => {
        // Encryptage du mot de passe
        const data = await new Promise(resolve => {
            bcrypt.genSalt(10, async(err, salt) => {
                return await bcrypt.hash(result, salt, (err, hash) => {
                    resolve(hash);
                });
            });
        });
        return data;
    },
    passwordGenerator: async() => {
        return Math.random().toString(36).slice(-8);
    },
    geocoder: async(number, adresse, ville) => {
        var geocoder = NodeGeocoder({
            provider: "opencage",
            apiKey: config.mapGeocoder.opencage.apikey
        });
        search = number + " " + adresse + ", " + ville;
        let geo = await geocoder.geocode(search, (err, res) => {
            return res[0];
        });
        console.log(geo[0]);
        return geo[0];
    },
    uploadImage: async(res, image) => {
        // to declare some path to store your converted image
        var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error("Invalid input string");
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], "base64");
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = "image." + extension;
        try {
            return fs.writeFileSync("./uploads/" + fileName, imageBuffer, "utf8");
        } catch (e) {
            next(e);
        }
    },
    UserExist: async(res, iduser) => {
        await new Promise((resolve, reject) => {
            if (iduser != undefined) {
                obj = {
                    iduser: iduser
                };
                sql.select("user", obj, async(error, user) => {
                    if (error) throw error;
                    const result = mapping.user(user);
                    if (result[0] == undefined) {
                        resolve(status.sendReturn(res, 400, { message: "utilisateur non reconnue" }));
                    } else {
                        reject();
                    }

                });
            }
        }).then(result => {
            return result;
        }).catch(err => {
            return console.log("user autorisé correct");
        });
    }
};