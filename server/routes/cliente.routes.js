import { Router } from "express";
import {getClientes, getClientePorId, postRegistroCliente, patchActualizarCliente, patchActualizarEstadoCliente, getHistorialCliente} from "../controllers/cliente.controller.js";


const router = Router();

router.get('/', getClientes); // define una ruta GET en la raíz del router que llama a la función getClientes del controlador
router.get('/:id', getClientePorId);
router.post('/', postRegistroCliente)
router.patch('/:id', patchActualizarCliente)
router.patch('/:id/estado', patchActualizarEstadoCliente)
router.get('/:id/historial', getHistorialCliente)
export default router;