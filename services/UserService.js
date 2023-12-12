const{Op}=require('sequelize')

class UserService{
    constructor(db){
        this.client=db.client
        this.user=db.User
    }
    
    async login(login){
        return await this.user.findOne({
            where:{
                [Op.or]:[ 
                    {email:login},
                          {userName:login}
                ]
            }
        })
    }
    async findUserByEmail(email) {
        return await this.user.findOne({ where: { email } });
    }
    
    async findUserByUsername(username) {
        return await this.user.findOne({ where: { userName: username } });
    }

    async createUser(firstname,lastname,username,email,encryptedPassword,salt,address,tlfnumber){
        return await this.user.create({
            firstName:firstname,
            lastName:lastname,
            userName:username,
            email:email,
            encryptedPassword:encryptedPassword,
            salt:salt,
            address:address,
            tlfNumber:tlfnumber,
            memberShip:'Bronze',
            totalPurchased:0,
            role:'User'
      })
    }

    async changeUserRole(userid){
        const user=await this.user.findOne({where:{id:userid}})
        if(!user){
            throw new Error("Userid wrong")
        }
        if(user.deleted==true){
            throw new Error("User is no longer activate")
        }
        if(user.role=="User"){ 
         user.role="Admin"
         await user.save()
          }
        else if(user.role=="Admin"){
            user.role="User"
            await user.save()
            
        }
        return user 
    }
   
    async getUsers(){
        return await this.user.findAll({
            attributes:{exclude:['encryptedPassword','salt']}
        })
    }

    async deleteUser(userid){
        const user=await this.user.findOne({where:{id:userid}})
        user.deleted=true
        await user.save()
        return user
    }

    async reactiveUser(userid){
        const user = await this.user.findOne({ where: { id: userid } });
        
        if (user.deleted == false) {
            throw new Error("This user is already active");
        } else {
            user.deleted = false;
            await user.save();
            
        }
        return user;
    }
}

module.exports=UserService