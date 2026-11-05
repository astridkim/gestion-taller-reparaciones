import express from 'express'
import clientesRoutes from './routes/cliente.routes.js' // importa las rutas de clientes desde el archivo clientes.routes.js
import aparatoRoutes from './routes/aparato.routes.js'
import cors from 'cors'
//express sirve para crear el servidor y manejar las rutas
// cors se utiliza para permitir solicitudes de diferetes dominios
const app = express();
const PORT = process.env.PORT || 3000 // 

app.use(cors())// habilita CORS para permitir solicitudes de diferentes dominios
app.use(express.json()); // habilita el parseo de JSON en las solicitudes entrantes

app.use('/clientes', clientesRoutes); // utiliza las rutas de clientes en la ruta /clientes
app.use('/aparato', aparatoRoutes);





app.get('/inicio', (req, res) => {// define una ruta GET en la raíz del servidor
    res.send('Hello World!'); // ruta raíz que responde con un mensaje de saludo
});

app.post('/data', (req, res) => {// define una ruta POST en /data
    const data = req.body; // obtiene los datos enviados en el cuerpo de la solicitud
    console.log(data); // imprime los datos en la consola del servidor
    res.json({ message: 'Data received successfully', receivedData: data }); // responde con un mensaje de éxito y los datos recibidos
});

app.listen(PORT, () => {// inicia el servidor en el puerto especificado
    console.log(`Server is running on port http://localhost:${PORT}/inicio`); // imprime un mensaje en la consola indicando que el servidor está corriendo
});

import pool from './config/database.js'; // importa el pool de conexiones a la base de datos









app.get('/prueba-db', async (req, res) => {

    try {
        const resultado = await pool.query('SELECT * FROM cliente');

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar PostgreSQL'
        });
    }

});