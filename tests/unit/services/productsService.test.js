const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");


describe("consulta os produtos no DB", () => {
  describe("quando retorna todos o valores corretamente", () => {
    const responseAllDB = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];
    before(async () => {
      const execute = responseAllDB; // retorno esperado nesse teste

      sinon.stub(productsModel, "getAll").resolves(execute);
      // sinon.stub(productsModel, "findById").resolves(execute[0]);
    });
    after(async () => {
      productsModel.getAll.restore();
      // productsModel.findById.restore();
    });

    it("retorna um array comos objetos corretos", async () => {
      const response = await productsService.getAll();

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property("data");
      expect(response.data).equal(responseAllDB);
    });
  });

  describe("quando retorna um produto corretamente segundo o ID", () => {
    const responseAllDB =
      [
        { id: 1, name: "Martelo de Thor" },
        // { id: 2, name: "Traje de encolhimento" },
        // { id: 3, name: "Escudo do Capitão América" },
      ];
    before(async () => {
      const execute = responseAllDB; // retorno esperado nesse teste

      // sinon.stub(productsModel, "getAll").resolves(execute);
      sinon.stub(productsModel, "findById").resolves(execute);
    });
    after(async () => {
      // productsModel.getAll.restore();
      productsModel.findById.restore();
    });

    it('retorna o produto certo pelo "id" se existe', async () => {
      const response = await productsService.findById(1);
      // console.log(response)
      // expect(response).to.have.a.property("id");
      expect(response.data).to.be.equal(responseAllDB[0]);

    });
    
  });
});
