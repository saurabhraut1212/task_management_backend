import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post('/tasks', verifyToken, createTask);
router.get('/tasks', verifyToken, getTasks);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

export default router;
