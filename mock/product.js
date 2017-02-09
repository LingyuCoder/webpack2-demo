/* quote-props: [0] */
module.exports = {
  'GET /api/products': function (req, res) {
    res.json({
      "success": 1,
      "meta": {
        "code": 200
      },
      "data": {
        "products": [{
          "sku": "11111adfaf",
          "category": "bbbbb"
        },
      ]}
    });
  },
};
