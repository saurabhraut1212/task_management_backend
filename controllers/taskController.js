import pool from "../config/dbConfig.js";

export const createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, dueDate, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
};

export const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        if (result.length === 0) {
            res.status(400).json({ message: 'No tasks found' });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
};

export const updateTask = async (req, res) => {
    const { title, description, dueDate, completed } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    try {

        const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        const task = taskResult.rows[0];

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        if (task.user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this task' });
        }

        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5 RETURNING *',
            [title, description, dueDate, completed, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
};


export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {

        const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        const task = taskResult.rows[0];

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        if (task.user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this task' });
        }


        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

        res.status(204).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
};

