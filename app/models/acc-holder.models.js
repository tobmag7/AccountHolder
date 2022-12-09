const mongoose = require('mongoose')
const AcctSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    oname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },    
},{
    timestamps: true
})

module.exports = mongoose.model('acct-name', AcctSchema)