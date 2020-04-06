const connection = require('../database/connection')

module.exports={
  index(req,res){
    let result;
    const ong_id = req.headers.authorization

    connection('incidents')
    .where('ong_id', ong_id)
    .select('*')
    .then(function(resultado){
      result = res.status(200).json(resultado);
    });

    return result;
  },
}