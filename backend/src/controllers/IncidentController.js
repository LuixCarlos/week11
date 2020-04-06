const connection = require('../database/connection')

module.exports = {

  async index(req,res){
    let result;
    let totalRegistros;
    const {page = 1} = req.query

    connection('incidents')
    .count()
    .then(function(resultado){
      totalRegistros = resultado[0]
    }).catch(function(error) { 
      console.log(error);
      result = res.status(500).json({message: 'Erro ao realizar a consulta 2'}); 
    });

    connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ])
    .then(function(result) {
      res.set('X-Total-Count', totalRegistros['count(*)']);
      result = res.status(200).json(result);
    })
    .catch(function(error) { 
      console.log(error);
      result = res.status(500).json({message: 'Erro ao realizar a consulta'}); 
    });
    return result;
  },

  create(req,res){
    let result;
    const { title, description, value} = req.body;
    const ong_id = req.headers.authorization

    connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    }).then(function(id) {
      result = res.status(200).json({ id: id[0] });
    })
    .catch(function(error) { 
      result = res.status(500).json({message: 'Erro ao cadatrar um Caso'}); 
    });

    return result;
  },

  delete(req, res){
    let result;
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    connection('incidents').where({
      'id': id,
      'ong_id': ong_id
    })
    .delete()
    .then(function(op){
      console.log(op);
      if(op > 0){
        result = res.status(200).json({message: "Caso Excluido com Sucesso !!"});
      }else{
        result = res.status(401).json({message: "Caso nao encontrado ou nao pertenca a Ong"});
      }
    });
  
    return result;
  }

}