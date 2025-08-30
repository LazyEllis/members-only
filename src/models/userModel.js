import pool from "../config/pool.js";

export const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  role,
}) => {
  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [firstName, lastName, username, password, role],
  );

  return rows[0];
};

export const findUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
};

export const findUserById = async (id) => {
  const query = `
  SELECT 
    users.id, 
    CONCAT(users.first_name, ' ', users.last_name) AS name,
    users.username,
    users.password,
    roles.name AS role
  FROM users
  JOIN roles ON users.role_id = roles.id
  WHERE users.id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const updateUserRole = async (id, { role }) => {
  await pool.query("UPDATE users SET role_id = $1 WHERE id = $2", [role, id]);
};
