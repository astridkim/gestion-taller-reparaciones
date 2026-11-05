import {obtenerClientes, obtenerClientePorId, buscarCliente, registrarCliente, actualizarCliente, actualizarEstadoCliente, historialcliente} from "../models/cliente.model.js";


export const listarClientes = async () => {
    const clientes = await obtenerClientes();
    return clientes;
}

export const consultarClientesPorId = async (id) => {
    const cliente = await obtenerClientePorId(id);
    return cliente;
};

export const buscarClientePorDato = async(dato) => {
    const clientes = await buscarCliente (dato);
    return clientes;
};

export const insertarCliente = async(dato) => {
    const registro = await registrarCliente(dato);
    return registro;
};

export const updateCliente = async(datos, id) => {
    const registro = await actualizarCliente(datos,id);
    if (!registro){
        throw new Error("Cliente no encontrado");
    }
    return registro;
};

export const updateEstado = async(estado, id)=>{
    const registro = await actualizarEstadoCliente(estado, id)

    if (!registro){
        throw new Error("Cliente no encontrado")
    }
    return registro;
};

export const histoCliente = async(id)=>{
    const registro = await(historialcliente(id))
    return registro
};