module.exports = {
    sendReturn: async(res, status = 500, data = { error: true, message: "Processing error" }) => {
        try {
            //console.log(data);
            res.status(status).json(data);
        } catch (error) {
            let sendError = { error: true, message: "Processing error" };
        }
    }
};