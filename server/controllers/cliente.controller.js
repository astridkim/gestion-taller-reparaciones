import {listarClientes, consultarClientesPorId, buscarClientePorDato, insertarCliente, updateCliente, updateEstado, histoCliente} from "../services/cliente.service.js";

export const getClientes = async (req, res) => {
    try {
        const {buscar} = req.query
        let clientes 
        if (buscar){
        clientes = await buscarClientePorDato(buscar)

        }
        else {
        clientes = await listarClientes();
        }

        res.json(clientes)
    }
    catch (error)
    {console.error(error); //sirve para imprimir el error en la consola del servidor
res.status(500).json({mensaje: 'Error al obtener clientes'});
    }
};

export const getClientePorId = async (req, res) => {
    try {
        const {id} = req.params;
        const cliente = await consultarClientesPorId(id);
        res.json(cliente);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Error al obtener el cliente'});
    }
};

export const postRegistroCliente = async (req, res) => {
    try {
        const datos = req.body;
        const registrar = await insertarCliente(datos)
        res.json(registrar);
    }
    catch (error){
        console.error(error);
        res.status(500).json({mensaje: 'Error al registrar clientes'})
    }
};

export const patchActualizarCliente = async (req, res) => {
    try {
        const datos = req.body;
        const {id} = req.params;
        const registrar = await updateCliente(datos,id)
        res.json(registrar);
    }
    catch (error){
        console.error(error);// para mostrar el error en la consola del servidor
        if (error.message === "Cliente no encontrado "){
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }
        res.status(500).json({mensaje: 'Error al actualizar clientes'})
    }
};

export const patchActualizarEstadoCliente = async (req, res) =>{
    try{
        const {activo} = req.body
        const {id} = req.params
        const registrar = await updateEstado(activo,id)
        res.json(registrar)
        
    }
    catch (error){
        console.error(error);
        if(error.message === "Cliente no encontrado"){
            res.status(404).json({
                mensaje: 'Cliente no encontrado'});
        }
        return res.status(500).json({mensaje: 'Error al actualizar clientes'})

    }
};

export const getHistorialCliente = async(req, res)=>{
    try {
        const {id} = req.params
        const registrar = await histoCliente(id)
        res.json(registrar)
    }
    catch (error){
        console.error(error);
        return res.status(500).json({mensaje: 'Error al consultar historial'})
    }
};