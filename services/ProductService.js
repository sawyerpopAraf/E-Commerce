class ProductService{
    constructor(db){
        this.sequelize=db.sequelize
        this.product=db.Product
        this.user=db.User
        this.brand=db.Brand
        this.category=db.Category
    }
    async getProducts(){
        return await this.product.findAll()
    }

    async addProduct(name,price,description,imageUrl,quantity,brandId,categoryId){
        const existingProduct=await this.product.findOne({
            where:{
                name:name
            }
        })
        if(existingProduct){
            throw new Error("Product already exists")
        }
        return await this.product.create({
            name:name,
            price:price,
            description:description,
            imageUrl:imageUrl,
            quantity:quantity,
            brandId:brandId,
            categoryId:categoryId
        })
    }

    async updateProduct(name,price,description,imageUrl,quantity,brandId,categoryId,id){
        const existingProduct=await this.product.findOne({
            where:{
                name:name
            }
        })
        if(existingProduct==null){
            throw new Error("Product not exists")
        }
        return await this.product.create({
            name:name,
            price:price,
            description:description,
            imageUrl:imageUrl,
            quantity:quantity,
            brandId:brandId,
            categoryId:categoryId
        },   
            {where:{id:id}}
               
        )}

    async deleteProduct(id){
            const existingId=await this.product.findOne({
                where:{
                    id:id
                }
            })
            if(!existingId){
                throw new Error("product not found")
            }
            return await this.product.destroy({
                where:{
                    id:id
                }
            })
        }

    



}

module.exports=BrandService