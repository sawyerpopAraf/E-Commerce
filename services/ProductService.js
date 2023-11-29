class ProductService{
    constructor(db){
        this.sequelize=db.sequelize
        this.product=db.Product
        this.user=db.User
        this.brand=db.Brand
        this.category=db.Category
    }
    async getProducts(){
       const query=`SELECT 
       Products.name,Products.price,Products.description,Products.imageUrl,Products.quantity,  
       Categories.name AS categoryName, 
       Brands.name AS brandName
   FROM 
       products
   JOIN 
       Categories ON products.categoryId = categories.id
   JOIN 
       Brands ON products.brandId = brands.id;`

       try{
        const[results,metadata]=await this.sequelize.query(query)
        console.log(results)
        return results
       }catch(error){
         throw new Error (error)
       }
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
                id:id
            }
        })
        if(!existingProduct){
            throw new Error("Product not exists")
        }
        return await this.product.update({
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

    async search(name){
         const query=`SELECT 
         Products.name,Products.price,Products.description,Products.imageUrl,Products.quantity,  
         Categories.name AS categoryName, 
         Brands.name AS brandName
     FROM 
         products
     JOIN 
         Categories ON Products.categoryId = categories.id
     JOIN 
         Brands ON Products.brandId = brands.id
     WHERE 
         Products.name LIKE '%${name}%'         
         `
        const[results,metadata]=await this.sequelize.query(query)
        return results
    }
    



}

module.exports=ProductService