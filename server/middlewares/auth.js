import jwt from 'jsonwebtoken'
import { ApiError } from '../helper/apiError.js'

const { verify } = jwt
const authorizationRequired = "Authorization required."
const invalidCredentials = "Invalid credentials."

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        next(new ApiError(authorizationRequired, 401))
    } else {
        try {
            const token = req.headers.authorization
            verify(token, process.env.JWT_SECRET_KEY)
            next()
        } catch(err) {
            next(new ApiError(invalidCredentials, 403))
        }
    }
}

export { auth }