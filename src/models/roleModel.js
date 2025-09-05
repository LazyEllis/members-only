import pool from "../lib/pool.js";

export const findRoleByName = async (name) => {
  const { rows } = await pool.query("SELECT id FROM roles WHERE name = $1", [
    name,
  ]);

  return rows[0].id;
};
