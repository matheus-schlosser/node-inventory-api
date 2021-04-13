import httpRequest from 'supertest'
import app from "../app"
import Products from '../entities/Products'

const databaseTables = {
    product: [
        { pdt_cat_id: 1, pdt_name: 'Product', pdt_image: "some image", pdt_price: "10", pdt_created_at: '2020-02-20T03:00:00.000Z', pdt_updated_at: '2019-02-20T03:00:00.000Z', pdt_deleted_at: null }
    ]
}

const product = { 
    pdt_cat_id: 1,
    pdt_name: "product name",
    pdt_image: "some image",
    pdt_price: "9.99"
} 

const productUpdated = {
    pdt_cat_id: 2,
    pdt_name: "product name updated",
    pdt_image: "some image updated",
    pdt_price: "10"
}

const productInvalidParams = {
    pdt_name: "",
    pdt_image: "",
    pdt_price: ""
}

let commonHeaders: any

beforeAll(async() => {
    await Products.truncate({ force: true })

    await Products.bulkCreate(databaseTables.product, {returning: true})

    const result: any = await httpRequest(app)
        .post('/v1/users/login')
        .send({email: "admin@admin.com", password: "admin"})
        
    const token = result.body.token

    commonHeaders = { "authorization": token }
})

describe('Testing Products Routes HTTP Methods', async () => {

    it('POST /v1/categories/products/create-product', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/categories/products/create-product')
            .set(commonHeaders)
            .send(product)
        
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Product Created Successfully' 
        })
        done()
    })

    it('POST /v1/categories/products/create-product (INVALID PARAMS)', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/categories/products/create-product')
            .set(commonHeaders)
            .send(productInvalidParams)
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "pdt_cat_id":  {
                    "key": "pdt_cat_id",
                    "label": "pdt_cat_id",
                    "longMessage": "The field pdt_cat_id is required",
                    "path": "pdt_cat_id",
                    "shortMessage": "Required Field",
                    "type": "any.required",
                },
                "pdt_name":  {
                    "key": "pdt_name",
                    "label": "pdt_name",
                    "longMessage": "The field pdt_name is required",
                    "path": "pdt_name",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "pdt_image": {
                    "key": "pdt_image",
                    "label": "pdt_image",
                    "longMessage": "The field pdt_image is required",
                    "path": "pdt_image",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "pdt_price": {
                    "key": "pdt_price",
                    "label": "pdt_price",
                    "longMessage": "The field pdt_price is required",
                    "path": "pdt_price",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                }
            },
            "type": "InvalidRequest",
        })
        done()
    })

    it('PUT /v1/categories/products/edit-product/:id', async done => {
        const result: any = await httpRequest(app)
            .put('/v1/categories/products/edit-product/2')
            .set(commonHeaders)
            .send(productUpdated)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Product Updated Successfully' 
        })
        done()
    })

    it('GET /v1/categories/products', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories/products')
            .set(commonHeaders)
            
        const endOfArray = result.body.length
        for(let i = 0; i < endOfArray; i++){
            expect(result.body[i]).toHaveProperty('pdt_id')
            expect(result.body[i]).toHaveProperty('pdt_name')
            expect(result.body[i]).toHaveProperty('pdt_image') 
        }
        done()
    })

    it('GET /v1/categories/products/:id', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories/products/2')
            .set(commonHeaders)
        
        expect(result.body).toHaveProperty('pdt_id')
        expect(result.body).toHaveProperty('pdt_name')
        expect(result.body).toHaveProperty('pdt_image') 
    
        done()
    })

    it('GET /v1/categories/products/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories/products/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Product not Found",
        })
        done()
    })

    it('DELETE /v1/categories/products/delete-product/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/categories/products/delete-product/10')
            .set(commonHeaders)

        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Product not Found"
        })
    
    done()
    })

    it('DELETE /v1/categories/products/delete-product/:id', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/categories/products/delete-product/2')
            .set(commonHeaders)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: "Product Deleted Successfully"
        })
        
        done()
    })

})
