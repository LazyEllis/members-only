import pool from "../config/pool.js";

export const createMessage = async ({ title, content, user }) => {
  await pool.query(
    "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
    [title, content, user],
  );
};
