const db=require('../models/index')

class initData{
      static async fetchData(URL){
       let products=[]
    
       try{ 
       const response=await fetch('http://backend.restapi.co.za/items/products')
       const data=await response.json()
    
       console.log(data)

       products=data.data
    }  
    catch(err)  {
         console.error('Error fetching data',err)
         return
    }
     //
      let brands=[...new Set(products.map(product=>product.brand))]
      let categories=[...new Set(products.map(product=>product.category))]

    //Insert database 

    for(const brand of brands){
     await db.query(`INSERT INTO Brands(name) VALUES(${brand})`)
    }

    for (const category of categories){
        await db.query(`ÌNSERT INTO Categories(name) VALUES(${category})`)
    }

    //fetch 


  for(const product of products)
  await db.query(ÌNSERT INTO Products(id,name,price,description,imageUrl,quantity,brandId,categoryId) 
        VALUE (${product.id},${product.price},${product.description},${product.imageUrl},${product.quantity},${product.brandId},${product.categoryId})
        
        )










 }
}