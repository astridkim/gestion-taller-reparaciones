import { insertarAparato } from "../services/aparato.service.js";

export const postRegistroAparato = async(req, res)=>{
    try {
    const datos = req.body;
    const registrar = await insertarAparato(datos);
    res.json(registrar)
} catch(error){
    console.error(error)
    if(error.message === "Cliente no encontrado"){
            res.status(404).json({
                mensaje: 'Cliente no encontrado'});
    ;}

    if (error.code === "23503" &&
        error.constraint === "fk_aparato_cliente"){
            res.status(404).json({
                mensaje: 'Cliente no encontrado'});
        }
    if (error.code === "23505") {
        return res.status(409).json({
            mensaje: "Número de serie ya registrado"
        })
    }
    return res.status(500).json({mensaje: 'Error al registrar un aparato'})

}}