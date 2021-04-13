import Categories from "../entities/Categories"

export default class CategoriesRepository {
  
  public static async createCategory(data: object) {
    return await Categories.create(data)
  }

  public static async updateCategory(data: object, categoryId: number){
    return await Categories.update(data, {
      where: {
        cat_id: categoryId
      }
    })
  }

  public static async getCategories() {   
    return await Categories.findAll({
      attributes: ['cat_id', 'cat_name', 'cat_image'],
    }) 
  }

  public static async getCategory(categoryId: number) {   
    return await Categories.findOne({
      attributes: ['cat_id', 'cat_name', 'cat_image'],
      where: {
        cat_id: categoryId
      }
    }) 
  }

  public static async deleteCategory(categoryId: number) {   
    const response = (await Categories.findOne({
      where: {
        cat_id: categoryId
      }
    }) as Categories)
    
    response.destroy()
  }

  public static async verifyExistingCategory(categoryName: string){
    return await Categories.findOne({
      where: {
        cat_name: categoryName
      }
    })
  }

  public static async verifyExistingCategoryById(categoryId: number){
    return await Categories.findOne({
      where: {
        cat_id: categoryId
      }
    })
  }

}