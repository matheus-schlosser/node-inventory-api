import Products from "../entities/Products"

export default class ProductsRepository {

  public static async createProduct(data: object) {
    return await Products.create(data)
  }

  public static async updateProduct(data: object, productId: number) {   
    return (await Products.update(data, {
      where: {
        pdt_id: productId
      }
    }))
  }

  public static async getProducts(){
    return await Products.findAll({
      attributes: ['pdt_id', 'pdt_cat_id', 'pdt_name', 'pdt_image']
    })
  }

  public static async getCategoryProducts(productId: number) {
    return (await Products.findAll({
      attributes: ['pdt_id', 'pdt_name', 'pdt_image'],
      where: {
        pdt_id: productId
    }})).map((product: any) => product)
  }

  public static async getProduct(productId: number){
    const response = (await Products.findOne({
      attributes: ['pdt_id', 'pdt_name', 'pdt_image'],
      where: {
        pdt_id: productId
      }
    }) as Products)
  
    return response
  }

  public static async getProductsByCategory(categoryId: number){
    const response = await Products.findAll({
      where: {
        pdt_id: categoryId
      }
    })
  
    return response
  }
  
  public static async deleteProduct(productId: number) {   
    const response = (await Products.findOne({
      where: {
        pdt_id: productId
      }
    }) as Products)
    
    response.destroy()
  }
}