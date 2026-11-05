import { Router } from "express";
import { postRegistroAparato } from "../controllers/aparato.controller.js";

const router = Router();
router.post('/', postRegistroAparato);
export default router