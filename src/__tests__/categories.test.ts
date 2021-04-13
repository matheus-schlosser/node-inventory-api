import httpRequest from 'supertest'
import app from "../app"
import Categories from '../entities/Categories'

const databaseTables = {
    category: [{
        cat_name: "Category", cat_image: "https://image.flaticon.com/icons/svg/733/733451.svg", cat_created_at: '2020-02-20T03:00:00.000Z', cat_updated_at: '2019-02-20T03:00:00.000Z', cat_deleted_at: null
    }]
}

const category = { 
    cat_name: "some content", cat_image: "some image"
} 

const categoryUpdated = {
    cat_name: "Category updated", cat_image: "some image updated"
}

const categoryInvalidParams = { 
    cat_name: "", cat_image: ""
} 

let commonHeaders: any

beforeAll(async() => {
    await Categories.truncate({ force: true })

    await Categories.bulkCreate(databaseTables.category, {returning: true})

    const result: any = await httpRequest(app)
        .post('/v1/users/login')
        .send({email: "admin@admin.com", password: "admin"})
        
    const token = result.body.token

    commonHeaders = { "authorization": token } 
})

describe('Testing Categories Routes HTTP Methods', async () => {

    it('POST /v1/categories/create-category', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/categories/create-category')
            .set(commonHeaders)
            .send(category)
        
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Category Created Successfully' 
        })
        done()
    })

    it('POST /v1/categories/create-category (INVALID PARAMS)', async done => {
        const result: any = await httpRequest(app)
            .post('/v1/categories/create-category')
            .set(commonHeaders)
            .send(categoryInvalidParams)
        
        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "cat_name":  {
                    "key": "cat_name",
                    "label": "cat_name",
                    "longMessage": "The field cat_name is required",
                    "path": "cat_name",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                },
                "cat_image":  {
                    "key": "cat_image",
                    "label": "cat_image",
                    "longMessage": "The field cat_image is required",
                    "path": "cat_image",
                    "shortMessage": "Required Field",
                    "type": "any.empty",
                }
            },
            "type": "InvalidRequest",
        })
    
        done()
    })

    it('PUT /v1/categories/edit-category/:id', async done => {
        const result: any = await httpRequest(app)
            .put('/v1/categories/edit-category/2')
            .set(commonHeaders)
            .send(categoryUpdated)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: 'Category Updated Successfully' 
        })
        done()
    })

    it('GET /v1/categories', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories')
            .set(commonHeaders)
        
        expect(result.body).toEqual(
            [
                {
                    "category": {"cat_id": 1, "cat_image": "https://image.flaticon.com/icons/svg/733/733451.svg", "cat_name": "Category"}, 
                    "products": [{"pdt_cat_id": 1, "pdt_id": 1, "pdt_image": "some image", "pdt_name": "Product"}]
                }, 
                {
                    "category": {"cat_id": 2, "cat_image": "some image updated", "cat_name": "Category updated"}, 
                    "products": []
                }
            ]
        )
        
        done()
    })

    it('GET /v1/categories/:id', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories/1')
            .set(commonHeaders)

        expect(result.body).toHaveProperty('cat_name')
        expect(result.body).toHaveProperty('cat_image') 
    
        done()
    })

    it('GET /v1/categories/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .get('/v1/categories/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Category not Found!"
        })
        done()
    })

    it('DELETE /v1/categories/delete-category/:id (WRONG ID)', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/categories/delete-category/10')
            .set(commonHeaders)
        
        expect(result.statusCode).toBe(404)
        expect(result.body).toEqual({
            error: true,
            message: "Category not Found!"
        })
        done()
    })

    it('DELETE /v1/categories/delete-category/:id (Related products)', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/categories/delete-category/1')
            .set(commonHeaders)

        expect(result.statusCode).toBe(400)
        expect(result.body).toEqual({
            "error": true,
            "errors": {
                "Category": {
                "longMessage": "Cannot remove a category that contains related products",
                "path": "Category",
                "shortMessage": "Cannot remove a category that contains related products",
                },
            },
            "type": "InvalidRequest",
        })
        
        done()
    })

    it('DELETE /v1/categories/delete-category/:id', async done => {
        const result: any = await httpRequest(app)
            .delete('/v1/categories/delete-category/2')
            .set(commonHeaders)

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            success: true,
            message: "Category Deleted Successfully"
        })
        
        done()
    })

})
