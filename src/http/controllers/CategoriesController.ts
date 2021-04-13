import {Request, Response} from 'express'
import { withMiddlewares } from "../../helper/withMiddlewares"
import { CreateMessage } from '../../helper/CreateErrorMessage'
import { verifyAuthToken } from '../middlewares/VerifyAuthToken'
import { createCategoryValidator, editCategoryValidator } from '../validators/categoriesValidator'
import CategoriesRepository from '../../repositories/CategoriesRepository'
import ProductsRepository from '../../repositories/ProductsRepository'

export default class CategoriesController {

    public static createCategory = withMiddlewares(
        verifyAuthToken,
        createCategoryValidator,
        async (req: Request, res: Response) => {
            try {
                const data = req.body
                const checkExistingCategory = await CategoriesRepository.verifyExistingCategory(data.cat_name)
                if (!checkExistingCategory){
                    await CategoriesRepository.createCategory(data)
                    res.status(200).send({success: true, message: 'Category Created Successfully'})
                }else{
                    CreateMessage.createValidationMessage(req, res, 400, "Category", "The Category already exists!", "The Category has already been created")
                }
            }
            catch(err) {
                CreateMessage.createServerErrorMessage(req, res, err, "Ocorreu um erro ao criar uma categoria")
            }
        }
    )

    public static editCategory = withMiddlewares(
        verifyAuthToken,
        editCategoryValidator,
        async (req: any, res: Response) => {
            try {
                const categoryId = req.params.id
                const data = req.body

                const checkExistingCategory = await CategoriesRepository.verifyExistingCategoryById(categoryId)
                if (!checkExistingCategory){
                    CreateMessage.createErrorMessage(req, res, 404, "Category not Found!")
                }

                await CategoriesRepository.updateCategory(data, categoryId)     
                res.status(200).send({success: true, message: 'Category Updated Successfully'})
            }
            catch(err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while updating category")
            }
        }
    )

    public static deleteCategory = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            try {
                const categoryId = req.params.id 
                const checkExistingCategory = await CategoriesRepository.verifyExistingCategoryById(categoryId)
                if (!checkExistingCategory){
                    return CreateMessage.createErrorMessage(req, res, 404, "Category not Found!")
                }
                const checkExistingProductsInCategory = await ProductsRepository.getProductsByCategory(categoryId)
                if (!checkExistingProductsInCategory.length){
                    await CategoriesRepository.deleteCategory(categoryId)   
                    res.status(200).send({success: true, message: 'Category Deleted Successfully'})
                }else{
                    CreateMessage.createValidationMessage(req, res, 400, "Category", "Cannot remove a category that contains related products", "Cannot remove a category that contains related products")
                }
            }
            catch(err) {
                CreateMessage.createServerErrorMessage(req, res, err, "An error occurred while deleting category")
            }
        }
    )

    public static getCategories = withMiddlewares(
        verifyAuthToken,
        async (req: Request, res: Response) => {

            try{
                const categories = await CategoriesRepository.getCategories()
                const products = await ProductsRepository.getProducts()
                if (!categories){
                    CreateMessage.createErrorMessage(req, res, 404, "Category not Found!")
                }
                
                const result = {categories, products}
                const data:any = []

                result.categories.map(categoryItem => {
                    const categoryProducts:any = []
                
                    result.products.map(productItem => {
                        if (productItem.pdt_cat_id === categoryItem.cat_id) {
                            categoryProducts.push(productItem)
                        }
                    })
                    return data.push(
                        Object.assign({}, {
                            category: categoryItem,
                            products: categoryProducts
                        }),
                    )
                })

                res.send(data)
            }
            catch(err) {
                CreateMessage.createErrorMessage(req, res, 400, "An error occurred while get categories data")
            }
        }
    )

    public static getCategory = withMiddlewares(
        verifyAuthToken,
        async (req: any, res: Response) => {
            const categoryId = req.params.id
            const category = await CategoriesRepository.getCategory(categoryId)
            if (category) {
                res.send(category)
            }
            else {
                CreateMessage.createErrorMessage(req, res, 404, "Category not Found!")
            }
        }
    )

}