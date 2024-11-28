import { pool } from '../helper/db.js'

const insertSharedFavorite = async (user_id, share_token) => {
    return await pool.query('INSERT INTO shared_favorites (user_id, share_token) VALUES ($1, $2) returning *', [user_id, share_token])
}


export { insertSharedFavorite }