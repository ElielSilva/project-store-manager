const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

const RESPONSE_DB = [[
    {
      sale_id: 1,
      date: '2022-08-16T15:02:45.000Z',
      product_id: 1,
      quantity: 5
    },
    {
      sale_id: 1,
      date: '2022-08-16T15:02:45.000Z',
      product_id: 2,
      quantity: 10
    },
    {
      sale_id: 2,
      date: '2022-08-16T15:02:45.000Z',
      product_id: 3,
      quantity: 15
    }
], []]
    
const RESPONSE_GET_ALL_SALES = [
    {
      saleId: 1,
      date: '2022-08-16T15:02:45.000Z',
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: '2022-08-16T15:02:45.000Z',
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: '2022-08-16T15:02:45.000Z',
      productId: 3,
      quantity: 15
    }
]

const RESPONSE_DB_FIND_BY_ID_SALES =[
  { date: '2022-08-16T15:40:43.000Z', product_id: 1, quantity: 5 },
  { date: '2022-08-16T15:40:43.000Z', product_id: 2, quantity: 10 }
]
// const RESPONSE_FIND_BY_ID_SALES = [
//   { date: "2022-08-16T15:40:43.000Z", productId: 1, quantity: 5 },
//   { date: "2022-08-16T15:40:43.000Z", productId: 2, quantity: 10 },
// ];

describe('models /Sales', () => {
  beforeEach(sinon.restore)

  describe('getAllsalles', () => {
    it('returns all sales', async () => {
      sinon.stub(connection, "execute").resolves(RESPONSE_DB);
      const result = await salesModel.getAllSales()
      expect(result).to.be.eql(RESPONSE_GET_ALL_SALES)
    })
  })

  describe("findByIdSales", () => {
    it("returns sales speficificed", async () => {
      sinon.stub(connection, "execute").resolves(RESPONSE_DB_FIND_BY_ID_SALES);
      // sinon.stub(connection, "execute").resolves(RESPONSE_DB_FIND_BY_ID_SALES);
      const result = await salesModel.findByIdSales(1);
      expect(result).to.be.eql(RESPONSE_DB_FIND_BY_ID_SALES);
    });
    // it("returns a array empty if o ID is not found", async () => {
    //   sinon.stub(connection, "execute").resolves([]);
    //   const result = await salesModel.findByIdSales();
    //   expect(result).to.be.eql([]);
    // });
  });
})