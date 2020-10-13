const request = require("supertest");


describe("Register User by rest API", () => {

    it("Register success", (done) => {
        request("http://localhost:3000")
            .post("/register")
            .send("nom=busi&prenom=allan&email=busi@gmail.com&password=Zoubida77")
            .set("Accept", "application/json")
            .expect(201, {
                error: false,
                message: "Super ton compte à été créé !"
            }, done);
    });
});