const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crud_db",
    password: "root123",
    port: 5432
});

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch((err) => {
        console.log("Database connection failed:", err.message);
    });

module.exports = pool;