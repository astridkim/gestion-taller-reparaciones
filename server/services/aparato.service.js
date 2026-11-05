import { registrarAparato } from "../models/aparato.model.js";

export const insertarAparato= async(datos)=>{
    const registrar = await registrarAparato(datos);
    if (!registrar){
        throw new error("Cliente no encontrado")
    }
    return registrar;
};