import pool from "../lib/pool.js";

export const createMessage = async ({ title, content, user }) => {
  await pool.query(
    "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
    [title, content, user],
  );
};

export const findMessages = async () => {
  const query = `
  SELECT 
    messages.id, 
    messages.title, 
    messages.content, 
    messages.user_id,
    messages.created_at,
    CONCAT(users.first_name, ' ', users.last_name) AS author,
    users.username,
    roles.name AS role
  FROM messages
  JOIN users ON messages.user_id = users.id
  JOIN roles ON users.role_id = roles.id
  ORDER BY created_at
  `;

  const { rows } = await pool.query(query);

  return rows;
};

export const removeMessage = async (id) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
};
