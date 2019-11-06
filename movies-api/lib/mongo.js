const { MongoClient, ObjectId } = require('mongodb');
//Archivo de configuracion porque de ahi vamos a contruir la URL
const { config } = require('../config');

//nos garantiza que poralguna razon hay caracteres especiales no 
//tengamos probelma al conetarlo
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${DB_NAME}?retryWrites=true&w=majority`
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {

    constructor() {
        this.client = new MongoClient(MONGO_URI, { userNewUrlParser: true, useUnifiedTopology: true })
        this.dbName = DB_NAME
    }

    //cada vez que nos conectemos no creemos un cliente, sino que usemos la conexcion
    //que ya esta abiert
    connect() {

        //connection es una variable estatica

        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    //callback error first
                    if (err) {
                        reject(err)
                    }
                    console.log("connected succesfully to mongo");
                    resolve(this.client.db(this.dbName))

                })
            })
        }
        return MongoLib.connection
    }

    //acciones
    //las funciones deben funcionar con cualquier collection
    //no solo con la de movies
    getAll(collection, query) {
        //  return MONGO_URI;
        return this.connect()
            .then(db => {
                return db.collection(collection).find(query).toArray()
            })
    }

    get(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).findOne({ _id: ObjectId(id) })
            })
    }
    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data)
            })
            .then(result => result.insertedId)
    }
    update(collection, id, data) {
        return this.connect()
            .then(db => {
                return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
            })
            .then(result => result.upsertedId || id);
    }
    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({ _id: ObjectId(id) })
            })
            .then(() => id)
    }
}

module.exports = MongoLib