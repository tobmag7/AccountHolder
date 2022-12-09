// module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Account = require("../models/acc-holder.models");
  
    // Create a new account
    router.post("/", async(req, res) => {
      try {
        const {fname,lname,oname,address} = req.body
        if (!fname || !lname || !oname || !address) {
          res.status(400).json({error: 'all fields are required'})
        }
        else{
          let account = await Account.create({
            fname,
            lname,
            oname,
            address
          })
          res.status(201).json(account)
        }
        
      } catch (error) {
        console.log(error)
      }});
      

    router.get('/accounts', async(req, res) => {
      try {
        let account = await Account.find()
        res.status(200).json(account)
      } catch (error) {
        console.log(error)
      }
    })

    router.get('/accounts/:id', async(req, res) => {
      try {
        let account = await Account.findById({_id: req.params.id})
        if (!account) {
          res.status(404).json({error: 'account does not exist'})
        } else {
          res.status(200).json(account)          
        }
      } catch (error) {
        console.log(error)
      }
    })


    router.delete('/accounts/:id', async(req, res) => {
      try {
        let account = await Account.findById({_id: req.params.id})
        if (!account) {
          res.status(404).json(account)
        } else {
          account = await Account.findByIdAndDelete({_id: req.params.id})
          res.status(200).json({msg: `account deleted successfully`})
        }
      } catch (error) {
        console.log(error)
      }
    })

    router.put('/accounts/:id', async(req, res) => {
      try {
        let account = await Account.find
      } catch (error) {
        
      }
    })


  
    // Retrieve all accounts
    // router.get("/", accounts.findAll);
  
    // Retrieve a single account with id
    // router.get("/:id", accounts.findOne);
  
    // Update an updated account with id
    // router.put("/:id", accounts.update);
  
    // Delete an account with id
    // router.delete("/:id", accounts.delete);
  
    // Delete all accounts
    // router.delete("/", accounts.deleteAll);
  
    // app.use('/api/accounts', router);


  // require("./app/routes/acc-holder.routes")(app);
  // const PORT = 3000;
  // app.listen();

  module.exports = router