module.exports = app => {
  const stocks = require("../controllers/stock.controller.js");

  var router = require("express").Router();

  // Create a new Stock
  router.post("/", stocks.create);

  // Retrieve all stocks
  router.get("/", stocks.findAll);

  // Retrieve all published stocks
  router.get("/published", stocks.findAllPublished);

  // Retrieve a single Stock with id
  router.get("/:id", stocks.findOne);

  // Update a Stock with id
  router.put("/:id", stocks.update);

  // Delete a Stock with id
  router.delete("/:id", stocks.delete);

  // Create a new Stock
  router.delete("/", stocks.deleteAll);

  app.use('/api/stocks', router);
};