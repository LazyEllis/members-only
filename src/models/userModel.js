import pool from "../config/pool.js";

export const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  role,
}) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, role_id) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, role],
  );
};

export const findUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
};
