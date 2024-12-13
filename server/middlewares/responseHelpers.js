import jwt from 'jsonwebtoken'
const { sign } = jwt

const responseHelpers = (req, res, next) => {
    res.exposeHeaders = () => {
        return res.header('Access-Control-Expose-Headers','Authorization,Set-Cookie')
    }
    
    res.authorizationHeader = (email) => {
        const access_token = sign({user: email}, process.env.JWT_SECRET_KEY, {expiresIn: '15m'})
        return res.header('Authorization','Bearer ' + access_token)
    }

    res.refreshToken = (email) => {
        const refresh_token = sign({user: email}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})
        
        return res.cookie('refreshToken',refresh_token,{
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production'
        })
    }

    next()
}

export default responseHelpers