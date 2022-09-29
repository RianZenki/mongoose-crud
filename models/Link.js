const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    type: String,
    required: true,
  },
  click: {
    type: Number,
    default: 0,
  },
})

// criando o modelo de uma coleção que possui a estrutura igual do linkSchema
module.exports = mongoose.model('Link', linkSchema)