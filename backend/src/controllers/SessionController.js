const connection = require('../database/connection')

module.exports={
  index(req,res){
    let result;
    const { id } = req.body

    connection('ongs')
    .where('id', id)
    .select('name')
    .first()
    .then(function(resultado){
      if(resultado != undefined){
        result = res.status(200).json(resultado);
      }else{
        result = res.status(400).json({message: "Ong nao encontrada"});
      }      
    });

    return result;
  },
}