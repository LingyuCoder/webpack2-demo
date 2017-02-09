/* eslint quotes: 0 */
const faker = require('faker');
module.exports = {
  'GET /api/products': function (req, res) {
    res.json({
      "success": true,
      "meta": {
        "code": 200
      },
      "data": {
        "products": [{
          "name": faker.commerce.productName(),
          "price": faker.commerce.price(),
          "image": faker.image.avatar(),
          "category": faker.commerce.department()
        }, {
          "name": faker.commerce.productName(),
          "price": faker.commerce.price(),
          "image": faker.image.avatar(),
          "category": faker.commerce.department()
        }, {
          "name": faker.commerce.productName(),
          "price": faker.commerce.price(),
          "image": faker.image.avatar(),
          "category": faker.commerce.department()
        }, {
          "name": faker.commerce.productName(),
          "price": faker.commerce.price(),
          "image": faker.image.avatar(),
          "category": faker.commerce.department()
        }]
      }
    });
  },
};
