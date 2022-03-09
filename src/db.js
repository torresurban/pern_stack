//la clase Pool nos va permitir crear una conexion con la base de datos
const {Pool} = require('pg');
const { db } = require('./config');

//Instanciamos 'Pool' la cual recibe un objeto de configuracion
const pool =new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
});

module.exports = pool;

