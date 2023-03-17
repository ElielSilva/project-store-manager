const sinon = require("sinon");
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const connection = require("../../../models/connection");

describe("Models /products", () => {
  beforeEach(sinon.restore);

  describe("getAll", () => {
    const responseDBAll = [
      [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ],
      [],
    ]; 

    it('se retorna todos os products corretamente', async () => {
      sinon.stub(connection, "execute").resolves(responseDBAll);
      // sinon.stub(productsModel, "getAll").resolves(responseDB);
      const getAllResponse = await productsModel.getAll()
      expect(getAllResponse).to.be.equal(responseDBAll[0]);
    })
  });

  describe("findByid", () => {
    const responseDBid = [[{ id: 1, name: "Martelo de Thor" }], []];

    it("se retorna um array com o objecto correto", async () => {
      sinon.stub(connection, "execute").resolves(responseDBid);
      // sinon.stub(productsModel, "findById").resolves(responseDB[0]);
      const getByIdResponse = await productsModel.findById(1);
      expect(getByIdResponse).to.be.an("array");
      expect(getByIdResponse).to.be.equal(responseDBid[0]);
    });
  });

  describe("findBySearch", () => {
    const responseDBSearch = [[
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ], []];

    it("se retorna um array com o objecto correto", async () => {
      sinon.stub(connection, "execute").resolves(responseDBSearch);
      // sinon.stub(productsModel, "findById").resolves(responseDB[0]);
      const getByIdResponse = await productsModel.findBySearch('de');
      expect(getByIdResponse).to.be.an("array");
      expect(getByIdResponse).to.deep.equal(responseDBSearch[0]);
    });
  });

  describe("createproduct", () => {
    const responseDBcreate = [{ insertId: 4}, []];
    it("se retorna um objeto com as keys id e name", async () => {
      sinon.stub(connection, "execute").resolves(responseDBcreate);
      const createResponse = await productsModel.createProduct({
        name: "cabelo do neymar",
      });
      expect(createResponse).to.be.keys("id", "name");
      expect(createResponse.name).to.be.equal("cabelo do neymar");
    });
  });

  describe("updateById", () => {
    // const responseDBcreate = [{ insertId: 4 }, []];
    it("retorna o novo produto.", async () => {
      sinon.stub(connection, "execute").resolves();
      const createResponse = await productsModel.updateById(1,{
        name: "cabelo do neymar",
      });
      expect(createResponse).to.be.keys("id", "name");
      expect(createResponse.name).to.be.equal("cabelo do neymar");
    });
  });

  describe("deleteById", () => {
    // const responseDBcreate = [{ insertId: 4 }, []];
    it("deleta product", async () => {
      sinon.stub(connection, "execute").resolves();
      await productsModel.deleteById(1);
    });
  });

});
