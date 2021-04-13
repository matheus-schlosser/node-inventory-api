import httpRequest from 'supertest'
import app from "../app"
// import Categories from '../entities/Categories'
// import Clients from '../entities/Clients'
import Orders from '../entities/Orders'
import Products from '../entities/Products'

// const databaseTables = {
//     product: [{
//         pdt_cat_id: 1, pdt_name: 'Desenvolvedor APP', pdt_image: "some image", pdt_price: "10", pdt_created_at: '2020-02-20T03:00:00.000Z', pdt_updated_at: '2019-02-20T03:00:00.000Z', pdt_deleted_at: null
//     }]
// }

const order = { 
    ord_cl_id: 1,
    ord_pdt_id: 1,
    ord_quantity: 3,
    ord_description: "Description",
    ord_status: true
} 

const orderUpdated = {
    ord_cl_id: 1,
    ord_pdt_id: 1,
    ord_quantity: 5,
    ord_description: "Description Updated",
    ord_status: true
}

const orderInvalidParams = {
    ord_cl_id: null,
    ord_pdt_id: null,
    ord_quantity: null,
    ord_description: "",
    ord_status: null
}

let commonHeaders: any

beforeAll(async() => {
    await Orders.truncate({ force: true })

    const result: any = await httpRequest(app)
    .post('/v1/users/login')
    .send({email: "admin@admin.com", password: "admin"})
    
    const token = result.body.token

    commonHeaders = { "authorization": token }
    
})

describe('Testing Orders Routes HTTP Methods', async () => {

    it('POST /v1/orders/create-order', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/orders/create-order')
            .set(commonHeaders)
            .send(order)
        
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Order Created Successfully' 
        })
        done()
    })

    it('POST /v1/orders/create-order (INVALID PARAMS)', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/orders/create-order')
            .set(commonHeaders)
            .send(orderInvalidParams)
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "ord_cl_id":  {
                    "key": "ord_cl_id",
                    "label": "ord_cl_id",
                    "longMessage": "The field ord_cl_id has an invalid Value",
                    "path": "ord_cl_id",
                    "shortMessage": "Invalid Value",
                    "type": "number.base",
                },
                "ord_pdt_id": {
                    "key": "ord_pdt_id",
                    "label": "ord_pdt_id",
                    "longMessage": "The field ord_pdt_id has an invalid Value",
                    "path": "ord_pdt_id",
                    "shortMessage": "Invalid Value",
                    "type": "number.base",
                },
                "ord_quantity": {
                    "key": "ord_quantity",
                    "label": "ord_quantity",
                    "longMessage": "The field ord_quantity has an invalid Value",
                    "path": "ord_quantity",
                    "shortMessage": "Invalid Value",
                    "type": "number.base",
                },
                "ord_description": {
                    "key": "ord_description",
                    "label": "ord_description",
                    "longMessage": "The field ord_description is required",
                    "path": "ord_description",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "ord_status": {
                    "key": "ord_status",
                    "label": "ord_status",
                    "longMessage": "The field ord_status has an invalid Value",
                    "path": "ord_status",
                    "shortMessage": "Invalid Value",
                    "type": "boolean.base",
                }
            },
            "type": "InvalidRequest",
        })
        done()
    })

    it('PUT /v1/orders/edit-order/:id', async done => {
        const result: any = await httpRequest(app)
            .put('/v1/orders/edit-order/1')
            .set(commonHeaders)
            .send(orderUpdated)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Order Updated Successfully' 
        })
        done()
    })

    it('GET /v1/orders', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/orders')
            .set(commonHeaders)
        
        const endOfArray = result.body.length
        for(let i = 0; i < endOfArray; i++){
            expect(result.body[i]).toHaveProperty('ord_cl_id')
            expect(result.body[i]).toHaveProperty('ord_pdt_id') 
            expect(result.body[i]).toHaveProperty('ord_quantity') 
            expect(result.body[i]).toHaveProperty('ord_description')
            expect(result.body[i]).toHaveProperty('ord_status')
        }
        
        done()
    })

    it('GET /v1/orders/:id', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/orders/1')
            .set(commonHeaders)
        
        expect(result.body).toHaveProperty('ord_cl_id')
        expect(result.body).toHaveProperty('ord_pdt_id') 
        expect(result.body).toHaveProperty('ord_quantity') 
        expect(result.body).toHaveProperty('ord_description')
        expect(result.body).toHaveProperty('ord_status')
    
        done()
    })

    it('GET /v1/orders/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/orders/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Order not Found"
        })
        
        done()
    })

    it('DELETE /v1/orders/delete-order/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/orders/delete-order/10')
            .set(commonHeaders)

        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Order not Found"
        })
        
        done()
    })

    it('DELETE /v1/orders/delete-order/:id', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/orders/delete-order/1')
            .set(commonHeaders)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: "Order Deleted Successfully"
        })
        
        done()
    })

})