const db = require("../models");
const Stock = db.stocks;

// Create and Save a new Stock
exports.create = (req, res) => {
  if(!req.body.symbol) return res.status(400).send({ message: "Content can not be empty!" })
  
  const stock = new Stock({
     symbol: req.body.symbol
  })


  stock
  .save(stock)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Stock."
    });
  });

};

// Retrieve all Stocks from the database.
exports.findAll = (req, res) => {
  const symbol = req.query.symbol;
  var condition = symbol ? { symbol: { $regex: new RegExp(symbol), $options: "i" } } : {};

  Stock.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stocks."
      });
    });
};


// Find a single Stock with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Stock.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Stock with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Stock with id=" + id });
      });
};

// Update a Stock by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Stock.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Stock with id=${id}. Maybe Stock was not found!`
            });
          } else res.send({ message: "Stock was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Stock with id=" + id
          });
        });
};

// Delete a Stock with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Stock.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Stock with id=${id}. Maybe Stock was not found!`
          });
        } else {
          res.send({
            message: "Stock was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Stock with id=" + id
        });
      });
};

// Delete all Stocks from the database.
exports.deleteAll = (req, res) => {
    Stock.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Stocks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stocks."
      });
    });
};

// Find all published Stocks
exports.findAllPublished = (req, res) => {
    Stock.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stocks."
      });
    });
};