import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
const { sign } = jwt
import { insertUser, selectUserByEmail, selectUserById, deleteUserInfo } from '../models/User.js'
import { addToBlacklist } from '../helper/blacklist.js'
import { ApiError } from '../helper/apiError.js'

const postRegistration = async (req, res, next) => {
    try {
        if (!req.body.email || req.body.email.length === 0) return next(new ApiError('Invalid email for user.', 400))
        // Password must have at least one uppercase letter and one number
        const uppercaseRegex = /[A-Z]/
        const numberRegex = /[0-9]/
        if (!req.body.password || !uppercaseRegex.test(req.body.password) || !numberRegex.test(req.body.password)) return next(new ApiError('Invalid password for user.', 400))
        if (!req.body.userName || req.body.userName.length === 0) return next(new ApiError('Invalid username for user.', 400))
        const hashedPassword = await hash(req.body.password, 10)
        const userFromDb = await insertUser(req.body.email, hashedPassword, req.body.userName)
        const user = userFromDb.rows[0]
        return res.status(201).json(createUserObject(user.id, user.email))
    } catch (error) {
        return next(error)
    }
}

const postLogin = async (req, res, next) => {
    const invalid_credentials_message = 'Invalid credentials.'
    try {
        if (!req.body.email || !req.body.password ) return next(new ApiError('Email and password are required.', 400))
        const userFromDb = await selectUserByEmail(req.body.email)
        if (userFromDb.rowCount === 0) return next(new ApiError(invalid_credentials_message, 401))

        const user = userFromDb.rows[0]
        if (!await compare(req.body.password, user.password)) return next(new ApiError(invalid_credentials_message, 401))

        return res
        .exposeHeaders()
        .authorizationHeader(req.body.email)
        .refreshToken(req.body.email)
        .status(200)
        .json(createUserObject(user.id, user.email))

    } catch (error) {
        return next(error)
    }
}

const postLogout = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]
        addToBlacklist(token)
        return res.status(200).json({'message': 'User logged out successfully.'})
    } catch (error) {
        return next(error)
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        if (!req.params.id) return next(new ApiError('User ID required.', 400))
        const id = parseInt(req.params.id)
        const userFromDb = await selectUserById(id)
        if (userFromDb.rowCount === 0) return next(new ApiError('User not found.', 404))
        await deleteUserInfo(id)
        return res.status(200).json({'message': 'User account deleted successfully.'})
    } catch (error) {
        return next(error)
    }
}

const createUserObject = (id, email) => {
    return {
        'id': id,
        'email': email
    }
}


export { postRegistration, postLogin, postLogout, deleteAccount }