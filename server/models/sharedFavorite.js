import { pool } from '../helper/db.js'

const insertSharedFavorite = async (user_id) => {
    return await pool.query('INSERT INTO shared_favorites (user_id) VALUES ($1) returning *', [user_id])
}

const selectShareTokenByUserId = async (user_id) => {
    return await pool.query('SELECT share_token FROM shared_favorites WHERE user_id = $1', [user_id])
}

const selectUserIdByShareToken = async (share_token) => {
    return await pool.query('SELECT user_id FROM shared_favorites WHERE share_token = $1', [share_token])
}


export { insertSharedFavorite, selectShareTokenByUserId, selectUserIdByShareToken }