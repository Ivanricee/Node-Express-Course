//los servicios se encargan de servir los datos
//Aqui va la logica del negocio
const MongoLib = require('../lib/mongo')

class MoviesService {
    constructor() {
        this.collection = 'moviess'
        this.mongoDB = new MongoLib();
    }
    async getMovies({ tags }) {
        //si existen los tags contruimos el siguiente query:
        //los tags que esten dentro de los tags que estamos pasando
        const query = tags && { tags: { $in: tags } }
        const movies = await this.mongoDB.getAll(this.collection, query)
        return movies || []
    }

    async getMovie({movieId}) {
        const movie = await this.mongoDB.get(this.collection,movieId)
        return movie || {}
    }

    async createMovie({movie}) {
        const createdMovieId = this.mongoDB.create(this.collection,movie)
        return createdMovieId || {}
    }

    async updateMovie({movieId,movie}={}) {
        const updateMovieId = await this.mongoDB.update(this.collection,movieId,movie)
        return updateMovieId || {}
    }
    async deleteMovie({movieId}) {
        const deletedMovieId = await this.mongoDB.delete(this.collection,movieId)
        return deletedMovieId || {}
    }
}

module.exports = MoviesService