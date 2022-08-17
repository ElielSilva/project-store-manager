const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");


describe("Service /products", () => {
  // const ERRO_400 = { code: 400, massege: '"name" is required' };
  // const ERRO_422 = {
  //   code: 422,
  //   message: '"name" length must be at least 5 characters long',
  // };
  beforeEach(sinon.restore)
  describe("getAll retorna todos o valores corretamente", () => {
    const responseAllDB = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];
    it("retorna um array comos objetos corretos", async () => {
      sinon.stub(productsModel, "getAll").resolves(responseAllDB);
      const response = await productsService.getAll();
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property("data");
      expect(response.data).equal(responseAllDB);
    });
  });

  describe("findById retorna um produto corretamente segundo o ID", () => {
    const responseAllDB =
      [
        { id: 1, name: "Martelo de Thor" },
      ];
    it('retorna o produto certo pelo "id" se existe', async () => {
      sinon.stub(productsModel, "findById").resolves(responseAllDB);
      const response = await productsService.findById(1);
      expect(response).to.have.a.property("code");
      expect(response).to.have.a.property("data");
      expect(response.code).equal(200);
      expect(response.data.name).equal("Martelo de Thor");
    });
    
    it('retorna retorna erro se "id" não existe', async () => {
      sinon.stub(productsModel, "findById").resolves([]);
      const response = await productsService.findById(4);
      expect(response).to.have.a.property("code");
      expect(response).to.have.a.property("message");
      expect(response.code).equal(404);
      expect(response.message).equal("Product not found");
    });
  });
    

  ////////
  describe("função createProduct", () => {
    const responseCreateDB = { id: 4, name: "Cabelo do Neymar" };
    const ERRO_400 = { code: 400, massege: '"name" is required' };
    const ERRO_422 = {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };

    it('code 200 e retorno o produto', async () => {
      sinon.stub(productsModel, "createProduct").resolves(responseCreateDB);
      const response = await productsService.createProduct({ name: "Cabelo do Neymar" });
      // console.log(response)
      expect(response).to.have.keys("code", "data");
      expect(response.code).equal(201);
      expect(response.data.name).equal("Cabelo do Neymar");
    });
    it('code 400 em name invalido', async () => {
      const response = await productsService.createProduct({
        names: "Cabelo do Neymar",
      });
      expect(response).to.have.keys("code", 'message');
      expect(response.code).equal(ERRO_400.code);
      expect(response.message).equal(ERRO_400.massege);
    });
    it("code 422 em com menos de 5 caracteres", async () => {
      const response = await productsService.createProduct({
        name: "lapi",
      });
      expect(response).to.have.keys("code", "message");
      expect(response.code).equal(ERRO_422.code);
      expect(response.message).equal(ERRO_422.message);
    });
  });

  // ===============
  // describe("função updateById", () => {
  //   const responseModel = { id: 1, name: "Cabelo do Neymar" };
  //   const ERRO_400 = { code: 400, massege: '"name" is required' };
  //   const ERRO_404 = {
  //     code: 404,
  //     message: "Product not found",
  //   };

  //   it("code 200 e retorno o produto", async () => {
  //     sinon.stub(productsModel, "updateById").resolves(responseModel);
  //     const response = await productsService.updateById(1,{
  //       name: "Cabelo do Neymar",
  //     });
  //     // console.log('==================', response)
  //     expect(response).to.have.keys("code", "data");
  //     expect(response.code).equal(200);
  //     expect(response.data.id).equal(1);
  //     expect(response.data.name).equal("Cabelo do Neymar");
  //   });
  //   it("code 400 em name invalido", async () => {
  //      sinon.stub(productsModel, "updateById").resolves(ERRO_400);
  //     const response = await productsService.updateById(1, {
  //       names: "Cabelo do Neymar",
  //     });
  //     expect(response).to.have.keys("code", "message");
  //     expect(response.code).equal(ERRO_400.code);
  //     expect(response.message).equal(ERRO_400.massege);
  //   });
  //   it("code 404", async () => {
  //     sinon.stub(productsService, "findById").resolves(ERRO_404);
  //     const response = await productsService.updateById(4,{
  //       name: "lapiz",
  //     });
  //     console.log(response)
  //     expect(response).to.have.keys("code", "message");
  //     expect(response.code).equal(ERRO_404.code);
  //     expect(response.message).equal(ERRO_404.message);
  //   });
  // });

  // describe("função deleteById", () => {
  //   const responseModel = { id: 1, name: "Cabelo do Neymar" };
  //   const ERRO_400 = { code: 400, massege: '"name" is required' };
  //   const ERRO_404 = {
  //     code: 404,
  //     message: "Product not found",
  //   };

  //   it("code 204 e retorno o produto", async () => {
  //     // sinon.stub(productsModel, "deleteById").resolves();
  //     sinon.stub(productsService, "findById").resolves({code:204});
  //     const response = await productsService.deleteById(1);
  //     // console.log('==================', response)
  //     expect(response).to.have.keys("code");
  //     expect(response.code).equal(204);
      
  //   });
  //   // it("code 400 em name invalido", async () => {
  //   //   sinon.stub(productsModel, "updateById").resolves(ERRO_400);
  //   //   const response = await productsService.updateById(1, {
  //   //     names: "Cabelo do Neymar",
  //   //   });
  //   //   expect(response).to.have.keys("code", "message");
  //   //   expect(response.code).equal(ERRO_400.code);
  //   //   expect(response.message).equal(ERRO_400.massege);
  //   // });
  //   it("code 404", async () => {
  //     sinon.stub(productsModel, "findById").resolves(ERRO_404);
  //     const response = await productsService.deleteById(4);
  //     console.log(response);
  //     expect(response).to.have.keys("code", "message");
  //     expect(response.code).equal(ERRO_404.code);
  //     expect(response.message).equal(ERRO_404.message);
  //   });
  // });

});

