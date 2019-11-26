const MongoLib = require('../lib/mongo')
//se encarga de crear passwords en modo hash
const bcrypt = require('bcrypt')

//crear la clase 
class UsersService {
    constructor(){
        //DEfinimos la collection de datos 
        this.collection = 'users'
        //y nuestr instacia de nuestra libreria de mongo
        this.mongoDB = new MongoLib();
    }

    async getUser({email}){
        const [user] = await this.mongoDB.getAll(this.collection,{email})
        return user
    }

    async createUser({user}){
        const {name,email,password} = user
        const hasshedPassword = await bcrypt.hash(password,10)

        const createUserId = await this.mongoDB.create(this.collection,{
            name,
            email,
            password: hasshedPassword
        })

        return createUserId
    }


}

module.exports = UsersService