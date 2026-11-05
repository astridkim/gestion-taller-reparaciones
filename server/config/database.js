import pg from 'pg';
import dotenv from 'dotenv/config'; //carga las variables de entorno del archivo .env

const { Pool } = pg;// Es un administrador de conexiones. En lugar de abrir una conexión nueva cada vez que consultes PostgreSQL, permite reutilizar conexiones.

const pool = new Pool({
    host: process.env.DB_HOST, // Dirección del servidor de la base de datos
    port: process.env.DB_PORT, // Puerto en el que escucha la base de datos
    user: process.env.DB_USER, // Usuario para conectarse a la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    database: process.env.DB_NAME, // Nombre de la base de datos a la que se quiere conectar
})

export default pool; // Exporta el pool de conexiones para que pueda ser utilizado en otros módulos del proyecto