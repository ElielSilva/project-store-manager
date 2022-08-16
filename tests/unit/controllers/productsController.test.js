const sinon = require("sinon");
const { expect } = require("chai");

const productsController = require('../../../controllers/productsController')
const productsService = require("../../../services/productsService");


describe("controller /products", () => {
  beforeEach(sinon.restore)
  describe("getAll pegando com sucesso", () => {
    const responseService = {
      code: 200,
      data: [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ],
    };
    const response = {};
    const request = {};
    it("getAll é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, "getAll").returns(responseService);

      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });

  describe("findById pegando com sucesso", () => {
    const responseService = {
      code: 200,
      data: [{ id: 1, name: "Martelo de Thor" }],
    };

    const responseServiceError = { code: 404, message: "Product not found" };

    const response = {};
    const request = { params: 1 };

    it("é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "findById").returns(responseService);
      await productsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("é chamado o status com o código 404", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "findById").resolves(responseServiceError);
      await productsController.findById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("createProduct", () => {
    const responseService = {
      code: 200,
      data: [{ id: 1, name: "Cabelo do Neymar" }],
    };

    const ERRO_400 = { code: 400, massege: '"name" is required' };
    const ERRO_422 = {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };

    const response = {};
    const request = {};

    it("é chamado o status com o código 200", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "createProduct").resolves(responseService);
      await productsController.createProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
    });

    it("é chamado o status com o código 404", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "createProduct").resolves(ERRO_400);
      await productsController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
    });

    it("é chamado o status com o código 422", async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "createProduct").resolves(ERRO_422);
      const result = await productsController.createProduct(request, response);
      console.log(result);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
  // ===================================================>>
  // describe("updateById", () => {
  //   const CODE_200 = {
  //     code: 200,
  //     data: [{ id: 1, name: "Cabelo do Neymar" }],
  //   };

  //   const ERRO_400 = { code: 400, massege: '"name" is required' };
  //   const ERRO_422 = {
  //     code: 422,
  //     message: '"name" length must be at least 5 characters long',
  //   };

  //   const response = {};
  //   const request = {};

  //   it("é chamado o status com o código 200", async () => {
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(productsService, "updateById").resolves(CODE_200);
  //     await productsController.updateById(request, response);

  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //     expect(response.json.calledWith()).to.be.equal(true);
  //   });

    // it("é chamado o status com o código 404", async () => {
    //   response.status = sinon.stub().returns(response);
    //   response.json = sinon.stub().returns();

    //   sinon.stub(productsService, "updateById").resolves({ code:400 , message:'product not found' });
    //   await productsController.updateById(request, response);

    //   expect(response.status.calledWith(400)).to.be.equal(true);
    //   expect(response.json.calledWith()).to.be.equal(true);
    // });

    // it("é chamado o status com o código 422", async () => {
    //   response.status = sinon.stub().returns(response);
    //   response.json = sinon.stub().returns();

    //   sinon.stub(productsService, "createProduct").resolves(ERRO_422);
    //   await productsController.createProduct(request, response);

    //   expect(response.status.calledWith(422)).to.be.equal(true);
    //   expect(response.json.calledWith()).to.be.equal(true);
    // });
  // });
});