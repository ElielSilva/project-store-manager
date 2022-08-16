const RESPONSE_MODEL_GET_ALL_SALES = [{
      saleId: 1,
      date: '2022-08-16T15:02:45.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: '2022-08-16T15:02:45.000Z',
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: '2022-08-16T15:02:45.000Z',
      productId: 3,
      quantity: 15,
    },
];

const RESPONSE_MODEL_FIND_BY_ID_SALES = [
  { date: '2022-08-16T15:40:43.000Z', productId: 1, quantity: 5 },
  { date: '2022-08-16T15:40:43.000Z', productId: 2, quantity: 10 },
];

module.exports = {
  RESPONSE_MODEL_GET_ALL_SALES,
  RESPONSE_MODEL_FIND_BY_ID_SALES,
};