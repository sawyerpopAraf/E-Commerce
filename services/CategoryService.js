class CategoryService{
    constructor(db){
        this.sequelize=db.sequelize
        this.category=db.Category
        this.userser=db.User
        this.product=db.Product
    }
    async createCategory(categoryName) {
        const existingCategory=await this.category.findOne({
            where:{
                name:categoryName
            }
        })
        if(existingCategory){
            throw new Error("Category already exists")
        }
        return await this.category.create({
            name: categoryName
        });
    }

    async getCategories(){
        return await this.category.findAll()
    }

    async deleteCategory(id){
        const existingId=await this.category.findOne({
            where:{
                id:id
            }
        })
        if(!existingId){
            throw new Error("Category not found")
        }

        let productCategoryId=await this.product.findAll({where:{categoryId:id}})
        
        if(productCategoryId.length>0){
            throw new Error ("Category is in use")        }
        
            return await this.category.destroy({
            where:{
                id:id
            }
        })
    }

    async updateCategory(id, newCategory) {
        const existingId=await this.category.findOne({
            where:{
                id:id
            }
        })
        if(!existingId){
            throw new Error("Category not found")
        }
        return this.category.update(
            { name: newCategory },
            { where: { id: id } }
        );
    }


















}

module.exports=CategoryService