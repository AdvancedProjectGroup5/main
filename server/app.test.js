import { expect } from 'chai'
import { initializeTestDb, insertTestUser, loginTestUser } from './helper/test.js'

const base_url = 'http://localhost:3001'

// Sign up
describe('Sign up', () => {
    before(async () => {
        await initializeTestDb()
    })

    it ('should register user account with valid email, password and username', async () => {
        const email = 'signup_test01@foo.com'
        const password = 'Signup01pass'
        const username = 'signup_test01'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email')
    })

    it ('should not register user account without email', async () => {
        const password = 'Signup02pass'
        const username = 'signup_test02'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid email for user.')
    })

    it ('should not register user account without password', async () => {
        const email = 'signup_test03@foo.com'
        const username = 'signup_test03'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid password for user.')
    })

    it ('should not register user account without username', async () => {
        const email = 'signup_test04@foo.com'
        const password = 'Signup04pass'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid username for user.')
    })

    it ('should not register user account with 0 length email', async () => {
        const email = ''
        const password = 'Signup05pass'
        const username = 'signup_test05'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid email for user.')
    })

    it ('should not register user account with only lowercase password', async () => {
        const email = 'signup_test06@foo.com'
        const password = 'signup06pass'
        const username = 'signup_test06'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid password for user.')
    })

    it ('should not register user account with only letters password', async () => {
        const email = 'signup_test07@foo.com'
        const password = 'Signuppass'
        const username = 'signup_test07'
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid password for user.')
    })

    it ('should not register user account with 0 length username', async () => {
        const email = 'signup_test08@foo.com'
        const password = 'Signup08pass'
        const username = ''
        const response = await fetch(base_url + '/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password, 'userName': username}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid username for user.')
    })
})


// Login
describe('Login', () => {
    const email = 'login_test01@foo.com'
    const password = 'Login01pass'
    const username = 'login_test01'
    before(async () => {
        await insertTestUser(email, password, username)
    })
    
    it ('should login with valid email and password', async () => {
        
        const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password}),
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email')

        const authHeader = response.headers.get('Authorization')
        expect(authHeader).to.not.be.null
        expect(authHeader.startsWith('Bearer ')).to.be.true

        const token = authHeader.split(' ')[1];
        expect(token).to.be.a('string').and.not.be.empty
    })

    it ('should not login without email', async () => {
        const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'password': password}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Email and password are required.')
    })

    it ('should not login without password', async () => {
        const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email}),
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Email and password are required.')
    })

    it ('should not login with nonexisting email', async () => {
        const wrongEmail = 'login_test04@foo.com'
        const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': wrongEmail, 'password': password}),
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid credentials.')
    })

    it ('should not login with the wrong password', async () => {
        const wrongPassword = 'WrongPassword'
        const response = await fetch(base_url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': email, 'password': wrongPassword}),
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid credentials.')
    })
})

// Logout
describe('Logout', () => {
    const email01 = 'logout_test01@foo.com'
    const password01 = 'Logout01pass'
    const username01 = 'logout_test01'

    const email02 = 'logout_test02@foo.com'
    const password02 = 'Logout02pass'
    const username02 = 'logout_test02'

    const email03 = 'logout_test03@foo.com'
    const password03 = 'Logout03pass'
    const username03 = 'logout_test03'
    
    before(async () => {
        await insertTestUser(email01, password01, username01)
        await insertTestUser(email02, password02, username02)
        await insertTestUser(email03, password03, username03)
    })
    
    it ('should logout with valid credential', async () => {
        const [token, refreshToken, id] = await loginTestUser(email01)
        const response = await fetch(base_url + '/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                Cookie: `refreshToken=${refreshToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('message')
        expect(data.message).to.equal('User logged out successfully.')
    })

    it ('should not logout without token', async () => {
        const response = await fetch(base_url + '/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Authorization required.')
    })

    it ('should not logout with invalid token', async () => {
        const invalidToken = 'InvalidToken'
        const response = await fetch(base_url + '/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + invalidToken,
                Cookie: `refreshToken=${invalidToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(403)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid credentials.')
    })
})

// Delete account
describe('Delete Account', () => {
    const email01 = 'delete_test01@foo.com'
    const password01 = 'Delete01pass'
    const username01 = 'delete_test01'

    const email02 = 'delete_test02@foo.com'
    const password02 = 'Delete02pass'
    const username02 = 'delete_test02'

    const email03 = 'delete_test03@foo.com'
    const password03 = 'Delete03pass'
    const username03 = 'delete_test03'

    const email04 = 'delete_test04@foo.com'
    const password04 = 'Delete04pass'
    const username04 = 'delete_test04'

    const email05 = 'delete_test05@foo.com'
    const password05 = 'Delete05pass'
    const username05 = 'delete_test05'
    
    const email06 = 'delete_test06@foo.com'
    const password06 = 'Delete06pass'
    const username06 = 'delete_test06'
    
    before(async () => {
        await insertTestUser(email01, password01, username01)
        await insertTestUser(email03, password03, username03)
        await insertTestUser(email04, password04, username04)
        await insertTestUser(email05, password05, username05)
        await insertTestUser(email06, password06, username06)
    })

    it ('should delete account with valid credential and id', async () => {
        const [token, refreshToken, id] = await loginTestUser(email01)
        const response = await fetch(base_url + '/auth/delete/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + token,
                Cookie: `refreshToken=${refreshToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('message')
        expect(data.message).to.equal('User account deleted successfully.')
    })

    it ('should not delete account without SQL injection', async () => {
        const [token, refreshToken, id] = await loginTestUser(email03)
        const response = await fetch(base_url + '/auth/delete/id=0 or id > 0', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + token,
                Cookie: `refreshToken=${refreshToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })

    it ('should not delete account with nonexisting id', async () => {
        const [token, refreshToken, id] = await loginTestUser(email04)
        const nonexistingId = 99999
        const response = await fetch(base_url + '/auth/delete/' + nonexistingId, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + token,
                Cookie: `refreshToken=${refreshToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(404)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('User not found.')
    })

    it ('should not delete account without token', async () => {
        const [token, refreshToken, id] = await loginTestUser(email05)
        const response = await fetch(base_url + '/auth/delete/' + id, {
            method: 'DELETE',
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Authorization required.')
    })

    it ('should not delete account with invalid token', async () => {
        const [token, refreshToken, id] = await loginTestUser(email06)
        const invalidToken = 'InvalidToken'
        const response = await fetch(base_url + '/auth/delete/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + invalidToken,
                Cookie: `refreshToken=${invalidToken};`
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(403)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
        expect(data.error).to.equal('Invalid credentials.')
    })
})
