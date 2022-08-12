const sinon = require("sinon");
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const connection = require("../../../models/connection");

describe("testa se ao chamar com GET /products", () => {
  describe("testa se restorna todos os produtos", () => {
    const responseDB = [
      [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ],
      [],
    ]; 
    before(async () => {
      const execute = responseDB; // retorno esperado nesse teste

       sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => { 
      connection.execute.restore();
    })

    
    it('se retorna todos os products corretamente', async () => {
      const getAllResponse = await productsModel.getAll()
      expect(getAllResponse).to.be.equal(responseDB[0]);
    })
  });
  describe("testa se restorna apenas o produto que que é do respectivo id", () => {
    const responseDB = [
      [
        { id: 1, name: "Martelo de Thor" },
      ],
      [],
    ];
    
    before(async () => {
      const execute = responseDB; // retorno esperado nesse teste

      sinon.stub(connection, "execute").resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });
    
    
    it("se retorna um array", async () => {
      const getAllResponse = await productsModel.findById(1);
      expect(getAllResponse).to.be.an("array");
    });

    it("se retorna o produto pelo id corretamente", async () => {
      const getAllResponse = await productsModel.findById(1);
      expect(getAllResponse).to.be.equal(responseDB[0]);
    });
  });
});
