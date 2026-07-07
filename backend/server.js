const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Todo API is running...");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add task
app.post("/tasks", async (req, res) => {
    try {
        const { task } = req.body;

        const result = await pool.query(
            "INSERT INTO tasks(task) VALUES($1) RETURNING *",
            [task]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;

        const result = await pool.query(
            "UPDATE tasks SET task=$1 WHERE id=$2 RETURNING *",
            [task, id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM tasks WHERE id=$1",
            [id]
        );

        res.json({ message: "Task deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});