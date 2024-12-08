import { pool } from '../helper/db.js'

const insertUser = async (email, hashedPassword, userName) => {
    return await pool.query('INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3) returning *', [email, hashedPassword, userName])
}

const selectUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email])
}

const selectUserById = async (id) => {
    return await pool.query('SELECT * FROM users WHERE id = $1', [id])
}

const deleteUserInfo = async (id) => {
    try {
        await pool.query('BEGIN')
        await pool.query('DELETE FROM reviews WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM favorites WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM shared_favorites WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        await pool.query('COMMIT')
        
      } catch (error) {
        await pool.query('ROLLBACK')
        throw error
      }
}


export { insertUser, selectUserByEmail, selectUserById, deleteUserInfo }