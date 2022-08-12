const sinon = require("sinon");
const { expect } = require("chai");

const productsController = require('../../../controllers/productsController')
const productsService = require("../../../services/productsService");

// const MoviesController = {
//   create: () => {},
// };

describe("Ao chamar o controller de create", () => {
//   describe("quando o payload informado não é válido", () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {};

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();
//     });

//     it("é chamado o status com o código 400", async () => {
//       await MoviesController.create(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Dados inválidos"', async () => {
//       await MoviesController.create(request, response);

//       expect(response.send.calledWith("Dados inválidos")).to.be.equal(true);
//     });
//   });

  describe("controller pegando com sucesso", () => {
    const responseService = {
      code: 200,
      data: [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ]};

    const response = {};
    const request = {};

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "getAll").returns(responseService);
    });

    after(() => { 
      productsService.getAll.restore();
    })

    it("getAll é chamado o status com o código 200", async () => {
      await productsController.getAll(request, response);
      // console.log('meu loggggggg ',response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("getAll é chamado o json com o data", async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  });

  describe("controller pegando com sucesso", () => {
    const responseService = {
      code: 200,
      data: [
        { id: 1, name: "Martelo de Thor" },
        // { id: 2, name: "Traje de encolhimento" },
        // { id: 3, name: "Escudo do Capitão América" },
      ],
    };

    const response = {};
    const request = {params: 1};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "findById").returns(responseService);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.findById(request, response);
      // console.log("meu loggggggg ", response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("é chamado o json com o data", async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});
