const acc_db = require('../models/acc-holder.models');
const account = acc_db.accounts;

//Create and save a new account
exports.create = (req, res) => {
    if (!req.body.type) {
        res.status(400).send({message: "Content Cannot Be Empty"});
        return;
    }
}


// Create an account
const acc = new acc_db({
    type: req.body.type,
    fname: req.body.fname,
    lname: req.body.lname,
    oname: req.body.oname,
    address: req.body.address,
});

// Saving account in the database
acc
    .save(acc)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({
            mesage:
                error.message || "Error occurred while creating the account."

        });
    });
    
    
    // Get all accounts from the database
    exports.findAll = (req, res) => {
        const type = req.query.type;
        var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};
      
        account.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(error => {
            res.status(500).send({
              message:
                error.message || "Some error occurred while retrieving accounts."
            });
          });
      };


      // Get an account with id
      exports.findOne = (req, res) => {
        const id = req.params.id;
      
        account.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "Cannot find account with id " + id });
            else res.send(data);
          })
          .catch(error => {
            res
              .status(500)
              .send({ message: "Error retrieving account with id=" + id });
          });
      };


      // Updating an account
      exports.update = (req, res) => {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      
        const id = req.params.id;
      
        account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update account with id=${id}. Maybe the account was not found!`
              });
            } else res.send({ message: "Account was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating account with id=" + id
            });
          });
      };


      // Delete an account with id
      exports.delete = (req, res) => {
        const id = req.params.id;
      
        account.findByIdAndRemove(id)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete account with id=${id}. Maybe account was not found!`
              });
            } else {
              res.send({
                message: "Account was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete account with id=" + id
            });
          });
      };


      //