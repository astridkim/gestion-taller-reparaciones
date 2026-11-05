import pool from "../config/database.js";

export const registrarAparato =  async(datos)=>{
    const resultado = await pool.query(
        `INSERT INTO aparato (tipo, marca, modelo, numero_serie, credencial, id_cliente)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_aparato, tipo, marca, modelo, numero_serie, credencial, id_cliente`
    ,
        [datos.tipo,
        datos.marca,
        datos.modelo,
        datos.numero_serie,
        datos.credencial,
        datos.id_cliente
        ]);

        return resultado.rows[0]
}