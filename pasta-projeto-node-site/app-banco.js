var desenvolvimento = true;

var configuracoes = {
    producao: {
        server: "servidor01191001.database.windows.net",
        user: "GF01191001",
        password: "#Gf49166116830",
        database: "projetoBrandao",
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000,
            connectionTimeout: 5000
        }
    },
    desenvolvimento: {
        server: "servidor01191001.database.windows.net",
        user: "GF01191001",
        password: "#Gf49166116830",
        database: "projetoBrandao",
        options: {
            encrypt: true
        }
    }
}
 
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
  sql.close();
  return sql.connect(configuracoes[perfil])
  // return new sql.ConnectionPool();  
} 

module.exports = {
    conectar: conectar,
    sql: sql
}
