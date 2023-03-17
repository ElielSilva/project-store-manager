const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

const variables = require("../../../helpers/testVariables")


describe("Service /products", () => {
  beforeEach(sinon.restore)
  describe("getAllSales", () => {
    it("getAllSales retorns all correct", async () => {
      sinon
        .stub(salesModel, "getAllSales")
        .resolves(variables.RESPONSE_MODEL_GET_ALL_SALES);
      const result = await salesService.getAllSales();
      expect(result).to.be.eql({
        code: 200,
        data: variables.RESPONSE_MODEL_GET_ALL_SALES,
      });
    });
  });

  describe("findByIdSales", () => {
    it(" returns sales with id speficificed", async () => {
      sinon.stub(salesModel, "findByIdSales").resolves(variables.RESPONSE_MODEL_FIND_BY_ID_SALES);
      const result = await salesService.findByIdSales(1);
      expect(result).to.be.eql({
        code: 200,
        data: variables.RESPONSE_MODEL_FIND_BY_ID_SALES,
      });
    });
    
    it(" returns sales with id not found", async () => {
      sinon
        .stub(salesModel, "findByIdSales")
        .resolves([]);
      const result = await salesService.findByIdSales(1);
      expect(result).to.be.eql({ code: 404, message: "Sale not found" });
    });
  });

  describe("createSales", () => {
    it("getAllSales retorns all correct", async () => {
      sinon
        .stub(salesModel, "createSales")
        .resolves(variables.RESPONSE_MODEL_GET_ALL_SALES);
      const result = await salesService.getAllSales();
      expect(result).to.be.eql({
        code: 200,
        data: variables.RESPONSE_MODEL_GET_ALL_SALES,
      });
    });
  });
});

