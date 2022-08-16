const sinon = require("sinon");
const { expect } = require("chai");

const salesController = require('../../../controllers/salesController')
const salesService = require("../../../services/salesService");


describe("controller /products", () => {
  beforeEach(sinon.restore)
  describe("getAllSales", () => {
    const response = {};
    const request = {};
    it("getAll é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, "getAllSales").returns({ code: 200, data: {} });

      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.eql(true);
      expect(response.json.calledWith()).to.be.eql(true);
    });
    // { code: 200, message: 'error interno' }
    it("getAll é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getAllSales")
        .returns({ code: 500, message: "error interno" });

      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(500)).to.be.eql(true);
    });
  });

  describe("findById pegando com sucesso", () => {
    const responseService = { code: 200, data: [],};

    const responseServiceError = { code: 404, message: "Product not found" };

    const response = {};
    const request = { params: 1 };

    it("é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "findByIdSales").resolves(responseService);
      await salesController.findByIdSales(request, response);

      expect(response.status.calledWith(200)).to.be.eql(true);
    });

    it("é chamado o status com o código 404", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "findByIdSales").resolves(responseServiceError);
      await salesController.findByIdSales(request, response);

      expect(response.status.calledWith(404)).to.be.eql(true);
    });
  });
});