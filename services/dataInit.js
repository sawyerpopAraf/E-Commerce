const db = require('../models/index');

class initData {
    constructor(db){
        this.sequelize=db.sequelize
        this.product=db.Product
        this.category=db.Category
        this.brand=db.Brand
    }
     async fetchData(URL,req,res,crypto) {
        let products = [];

        try { 
            const response = await fetch(URL);
            const data = await response.json();
            products = data.data;
        } catch (err) {
            console.error('Error fetching data', err);
            return;
        }

        // Insert brands and mapping the key:value pair
        let brands = [...new Set(products.map(product => product.brand))];
        let brandMap={}
        for (const brand of brands) {
            await db.sequelize.query(`INSERT INTO Brands (name) VALUES ('${brand}')`);
            const brandRecord= await this.brand.findOne({
                where:{
                   name:brand
                }
            })
            console.log(brandRecord)
            if(brandRecord){
                brandMap[brand]=brandRecord.id
            }
        }
      

        // Insert categories, i have mapped the retrived result, so i can use it later on product.category_id
        let categories = [...new Set(products.map(product => product.category))];
        let categoryMap={}
        for (const category of categories) {
            await db.sequelize.query(`INSERT INTO Categories (name) VALUES ('${category}')`);
            const categoriesRecord= await this.category.findOne({
                where:{
                   name:category
                }
            })
            if(categoriesRecord){
                categoryMap[category]=categoriesRecord.id
            }
        }
      

        
        //insert Products 
        for (const product of products) {
            const brandId=Number(brandMap[product.brand])
            console.log(brandId)
            const categoryId=Number (categoryMap[product.category])
            await db.sequelize.query(`
                INSERT INTO Products 
                (id, name, price, description, imageUrl, quantity, brandId, categoryId) 
                VALUES 
                (${product.id}, '${product.name}', ${product.price}, '${product.description}', '${product.imgurl}', ${product.quantity}, ${brandId}, ${categoryId})
            `);
        }

        //insert Admin
        var { password } = req.body;
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 32, "sha256", async function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
        
            try {
                const insertQuery = `
                    INSERT INTO Users (id, firstName, lastName, userName, email, encryptedPassword, salt, address, tlfNumber, totalPurchased, role) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
        
                await db.sequelize.query(insertQuery, {
                    replacements: [1, 'Admin', 'Support', 'Admin', 'admin@noroff.no', hashedPassword, salt, 'Online', 911, 0, 'Admin'],
                    type: db.sequelize.QueryTypes.INSERT
                });
            } catch (insertErr) {
                return next(insertErr);
            }
        });
        
        }
}

module.exports = initData;
