import pool from "../config/database.js";

export const obtenerClientes = async () => {
    const resultado = await pool.query('SELECT id_cliente, nombre, telefono, correo, direccion, dpi, activo FROM cliente')
    return resultado.rows;
}

export const obtenerClientePorId = async (id) => {
    const resultado = await pool.query('SELECT id_cliente, nombre, telefono, correo, direccion, dpi, activo FROM cliente WHERE id_cliente = $1', [id])

    return resultado.rows[0];
};

export const buscarCliente = async (dato) => {
    const resultado = await pool.query( 
    `SELECT id_cliente, nombre, telefono, correo, direccion, dpi, activo
        FROM cliente
        WHERE nombre ILIKE $1
        OR telefono LIKE $1
        OR dpi LIKE $1;`)
    
        return resultado.rows; //rows devuelve los resultados.
} 

export const registrarCliente = async (datos) =>
{
    const resultado = await pool.query(
    `INSERT INTO cliente (nombre, telefono, correo, direccion, dpi, activo)
    VALUES ($1, $2, $3, $4, $5, TRUE)
    RETURNING id_cliente, nombre, telefono, correo, activo`, 
    
    [
        datos.nombre,
        datos.telefono,
        datos.correo,
        datos.direccion,
        datos.dpi

    ]);
    return resultado.rows[0]
};

export const actualizarCliente = async(datos,id) => {
    
    const camposPermitidos = [
    'nombre', 
    'telefono',
    'correo',
    'direccion',
    'dpi'];
    
    const campos = Object.keys(datos).filter(
        campo => camposPermitidos.includes(campo)
    )

    if (campos.length === 0 ){
        throw new Error("No hay campos validos para actualizar");
    }
    const valores = campos.map(campo => datos[campo]);
    const set = campos.map( 
        (campo, indice) => `${campo} = $${indice + 1}`
    ).join(',');

    valores.push(id)

    const resultado = await pool.query (
        `UPDATE cliente
        SET ${set}
        WHERE id_cliente = $${valores.length}
        RETURNING id_cliente, nombre, telefono, correo, direccion, dpi, activo`,
        valores
    )
        
        return resultado.rows[0];
    }


export const actualizarEstadoCliente = async(estado, id) => {
    const resultado = await pool.query(
            `UPDATE cliente
                SET activo = $1
                WHERE id_cliente = $2
                RETURNING id_cliente, nombre, activo`,
                [estado,
                id]
        )
        return resultado.rows[0]
    }

export const historialcliente = async(id) => {
    const resultado=  await pool.query(
        `SELECT 
        cliente.nombre,
        aparato.tipo,
        orden.id_orden
        FROM orden
        LEFT JOIN aparato
        ON orden.id_aparato = aparato.id_aparato
        LEFT JOIN cliente
        ON orden.id_cliente = cliente.id_cliente
        WHERE orden.id_cliente = $1
        `,
        [id]
    );
    return resultado.rows;
} 