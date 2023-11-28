class BrandService{
    constructor(db){
        this.sequelize=db.sequelize
        this.brand=db.Brand
        this.userser=db.User
        this.product=db.Product
    }
    async createBrand(brandName) {
        const existingBrand=await this.brand.findOne({
            where:{
                name:brandName
            }
        })
        if(existingBrand){
            throw new Error("Brand already exists")
        }
        return await this.brand.create({
            name: brandName
        });
    }

    async getBrands(){
        return await this.brand.findAll()
    }

    async deleteBrand(id){
        const existingId=await this.brand.findOne({
            where:{
                id:id
            }
        })
        if(!existingId){
            throw new Error("Brand not found")
        }

        let productBrandId=await this.product.findAll({where:{brandId:id}})
        
        if(productBrandId.length>0){
            throw new Error ("Brand is in use")        }
        
            return await this.brand.destroy({
            where:{
                id:id
            }
        })
    }

    async updateBrand(id, newBrand) {
        const existingId=await this.brand.findOne({
            where:{
                id:id
            }
        })
        if(!existingId){
            throw new Error("Brand not found")
        }
        return this.brand.update(
            { name: newBrand },
            { where: { id: id } }
        );
    }


















}

module.exports=BrandService