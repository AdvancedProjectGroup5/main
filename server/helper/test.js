import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
const { sign } = jwt
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const initializeTestDb = async () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "../movieApp.sql"), "utf8")
    await pool.query(sql)
}

const insertTestUser = async (email, password, username) => {
    const hashedPassword = await hash(password, 10)
    await pool.query('INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3)', [email, hashedPassword, username])
}

const loginTestUser = async (email) => {
    const token =  sign({user: email}, process.env.JWT_SECRET_KEY, { expiresIn: '1m' })
    const refreshToken =  sign({user: email}, process.env.JWT_SECRET_KEY, { expiresIn: '2m' })
    const userFromDb = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    const id = userFromDb.rows[0].id

    return [ token, refreshToken, id ]
}

export { initializeTestDb, insertTestUser, loginTestUser }