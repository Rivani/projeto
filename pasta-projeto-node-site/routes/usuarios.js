// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var usuario = req.body.usuario; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (usuario == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${usuario} / ${senha}`);
    }
    return banco.sql.query(`select * from projetoBrandao where usuario='${usuario}' and nova_senha='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.post('/cadastrar', function (req, res, next) {

  var nome;
  var usuario;
  var nova_senha;
  var email;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	  nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    usuario = req.body.usuario; // depois de .body, use o nome (name) do campo em seu formulário de login
    nova_senha = req.body.nova_senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (usuario == undefined || nova_senha == undefined || nome == undefined || email == undefined) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${usuario} / ${nova_senha} / ${nome} / ${email}`);
    }
    return banco.sql.query(`select count(*) as contagem from projetoBrandao where usuario = '${usuario}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o login "${usuario}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;


    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into projetoBrandao (nome, usuario, nova_senha, email) values ('${nome}','${usuario}','${nova_senha}','${email}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
  

});


// não mexa nesta linha!
module.exports = router;
