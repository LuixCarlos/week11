const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {

  index (req, res){
    let result;
    connection('ongs').select('*')
    .then(function(result){
      result = res.status(200).json(result);
    })
    .catch(function(error){
      result = res.status(500).json({message: 'Erro ao listar todas as Ongs'});
    });
  
    return result;
  
  },

  create(req, res){
    let result;
    const {name, email, whatsapp, city, uf} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
  
    connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    }).then(function(rows) {
      result = res.status(200).json({id});
    })
    .catch(function(error) { 
      result = res.status(500).json({message: 'Erro ao cadatrar uma Ong'}); 
    });
  
    return result;
  }

}