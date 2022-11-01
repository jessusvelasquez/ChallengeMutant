const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mutant')


// schema dna_human_schema
var dna_human_schema = new mongoose.Schema({
    dna: [],
    mutant: Boolean
}, { collection: 'dnas_humans' });


var human_dna = mongoose.model("human_dna", dna_human_schema);


module.exports ={
    mongoose,
    human_dna
}