import httpRequest from 'supertest'
import app from "../app"
import Clients from '../entities/Clients'

const databaseTables = {
    client:[{
        cl_name: "company", cl_responsible: "responsible", cl_phone: "99999999", cl_active: true, cl_created_at: '2020-02-20T03:00:00.000Z', cl__updated_at: '2019-02-20T03:00:00.000Z', cl_deleted_at: null
    }]
}

const client = { 
    cl_name: "T.I company",
    cl_responsible: "responsible test",
    cl_phone: "99999999",
    cl_active: true
} 

const clientUpdated = {
    cl_name: "company test updated",
    cl_responsible: "responsible updated",
    cl_phone: "99999999",
    cl_active: true
}

const clientInvalidParams = {cl_name: "", cl_responsible: "", cl_phone: "", cl_active: true } 

let commonHeaders: any

beforeAll(async() => {
    await Clients.truncate({ force: true })
    await Clients.bulkCreate(databaseTables.client, {returning: true})

    const result: any = await httpRequest(app)
        .post('/v1/users/login')
        .send({email: "admin@admin.com", password: "admin"})
        
    const token = result.body.token

    commonHeaders = { "authorization": token }
    
})

describe('Testing Clients Routes HTTP Methods', async () => {
    
    it('POST /v1/clients/create-client', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/clients/create-client')
            .set(commonHeaders)
            .send(client)
        
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Client Created successfully' 
        })
        done()
    })

    it('POST /v1/clients/create-client (INVALID PARAMS)', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/clients/create-client')
            .set(commonHeaders)
            .send(clientInvalidParams)
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "cl_name":  {
                    "key": "cl_name",
                    "label": "cl_name",
                    "longMessage": "The field cl_name is required",
                    "path": "cl_name",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "cl_phone": {
                    "key": "cl_phone",
                    "label": "cl_phone",
                    "longMessage": "The field cl_phone is required",
                    "path": "cl_phone",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "cl_responsible": {
                    "key": "cl_responsible",
                    "label": "cl_responsible",
                    "longMessage": "The field cl_responsible is required",
                    "path": "cl_responsible",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                }
            },
            "type": "InvalidRequest",
        })

        done()
    })

    it('PUT /v1/clients/edit-client/:id', async done => {
        const result: any = 
        await httpRequest(app)
            .put('/v1/clients/edit-client/2')
            .set(commonHeaders)
            .send(clientUpdated)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Client Updated Successfully' 
        })
        done()
    })

    it('GET /v1/clients', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/clients')
            .set(commonHeaders)

        const endOfArray = result.body.length
        for(let i = 0; i < endOfArray; i++){
            expect(result.body[i]).toHaveProperty('cl_id')
            expect(result.body[i]).toHaveProperty('cl_name')
            expect(result.body[i]).toHaveProperty('cl_responsible') 
            expect(result.body[i]).toHaveProperty('cl_phone') 
            expect(result.body[i]).toHaveProperty('cl_active')
        }
        done()
    })

    it('GET /v1/clients/:id', async done => {
        const result: any =  await httpRequest(app).get('/v1/clients/2').set(commonHeaders)
        expect(result.body).toHaveProperty('cl_id')
        expect(result.body).toHaveProperty('cl_name')
        expect(result.body).toHaveProperty('cl_responsible') 
        expect(result.body).toHaveProperty('cl_phone') 
        expect(result.body).toHaveProperty('cl_active')
    
        done()
    })

    it('GET /v1/clients/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/clients/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Client not found"
        })
        done()
    })

    it('DELETE /v1/clients/delete-client/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/clients/delete-client/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Client not Found!"
        })
        done()
    })

    it('DELETE /v1/clients/delete-client/:id', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/clients/delete-client/2')
            .set(commonHeaders)

            expect(result.statusCode).toBe(200)
            expect(result.body).toEqual({
                success: true,
                message: "Client Deleted Successfully"
            })
        
        done()
    })

})