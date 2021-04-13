import httpRequest from 'supertest'
import app from "../app"
import Users from '../entities/Users'

const databaseTables = {
    user:[{
      usr_name: "admin", usr_email: "admin@admin.com", usr_password: "$2a$08$ghQBwwmLf5bflIQovuEKBur82rXYavd4gPxaTk2cPk06JGp3cO/mq", usr_active: true, usr_created_at: '2020-02-20T03:00:00.000Z', cl__updated_at: '2019-02-20T03:00:00.000Z', usr_deleted_at: null
    }]
}
const user = { name: "test", email: "test@test.com", password: "test" } 
const userInvalidParams = { name: "", email: "", password: "" }
const userLoginInvalidParams = { email: "admin@admin.com", password: "test" }  

beforeAll(async() => {
  await Users.truncate({ force: true })
  await Users.bulkCreate(databaseTables.user, {returning: true})
})

describe('Testing Users Routes HTTP Methods', async () => {
    
    it('POST /v1/users/register', async done => {
        const result: any = await httpRequest(app)
          .post('/v1/users/register')
          .send(user)
        
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'User Created Successfully' 
        })
        done()
    })

    it('POST /v1/users/register (INVALID PARAMS)', async done => {
        const result: any = await httpRequest(app)
          .post('/v1/users/register')
          .send(userInvalidParams)
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "name":  {
                    "key": "name",
                    "label": "name",
                    "longMessage": "The field name is required",
                    "path": "name",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "email": {
                    "key": "email",
                    "label": "email",
                    "longMessage": "The field email is required",
                    "path": "email",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "password": {
                    "key": "password",
                    "label": "password",
                    "longMessage": "The field password is required",
                    "path": "password",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                }
            },
            "type": "InvalidRequest",
        })

        done()
    })

    it('POST /v1/users/login', async done => {
      const result: any = await httpRequest(app)
        .post('/v1/users/login')
        .send({email: "admin@admin.com", password: "admin"})
      
      expect(result.statusCode).toBe(200)
      expect(result.body).toHaveProperty('auth', true)
      expect(result.body).toHaveProperty('token')
      done()
  })

  it('POST /v1/users/login (INVALID PARAMS)', async done => {
    const result: any = await httpRequest(app)
      .post('/v1/users/login')
      .send(userLoginInvalidParams)
    
    expect(result.statusCode).toBe(401)
    expect(result.body).toEqual({
      "error": true,
      "errors": {
        "user": {
          "longMessage": "User or Password Invalids",
          "path": "user",
          "shortMessage": "User or Password Invalids",
        },
      },
      "type": "InvalidRequest",
    })
    done()
  })
})