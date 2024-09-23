import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server started');
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});