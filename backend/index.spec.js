const request = require("supertest");
const app = require('./server');

describe('Test', () => {
    it("Create short URL", async done => {
        await request(app)
            .post("/api/shortUrls")
            .send({
                fullUrl: "https://www.google.com"
            })
            .expect(302)
            .then((response) => {
                expect(response.statusCode).toBe(302);
            });
        done();
    });

    it("Receive latest 10 URLs", async done => {
        await request(app)
            .get("/api/latest")
            .expect(200)
        done();
    });

    it("Get stats", async done => {
        await request(app)
            .get(`/api/KTMwd5/stats`)
            .expect(200)
        done();
    });

    it("Modify URL", async done => {
        await request(app)
            .post("/api/g-I2ki/modify")
            .send({
                changedName: "abdce"
            })
        done();
    });

    it("Clicks", async done => {
        await request(app)
            .get("/api/g-I2ki")
            .send({
                clicks: "Never"
            })
        done();
    });
});

