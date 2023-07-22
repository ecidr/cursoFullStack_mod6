const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("./../index.js");

chai.use(chaiHttp);
describe("prueba ruta GET/", function () {
  it("retornar codigo 200", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
