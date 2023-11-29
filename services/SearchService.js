class ProductService{
    constructor(db){
        this.sequelize=db.sequelize
        this.product=db.Product
        this.user=db.User
        this.brand=db.Brand
        this.category=db.Category
    }
 
    async searchByName(name){
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

    async searchByBrand(name){
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
        Brands.name LIKE '%${name}%'         
        `
       const[results,metadata]=await this.sequelize.query(query)
       return results
   }

   async searchByCategory(name){
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
    Categories.name LIKE '%${name}%'         
    `
   const[results,metadata]=await this.sequelize.query(query)
   return results
}
    



}

module.exports=ProductService