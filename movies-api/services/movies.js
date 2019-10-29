//los servicios se encargan de servir los datos
//Aqui va la logica del negocio
const { moviesMock} = require('../utils/mocks/movies')

class MoviesService {
    async getMovies(){
        const movies = await Promise.resolve(moviesMock)
        return movies || []
    }

    async getMovie(){
        const movie = await Promise.resolve(moviesMock[0])
        return movie || {}
    }

    async createMovie(){
        const createdMovieId = await Promise.resolve(moviesMock[0].id)
        return createdMovieId || {}
    }

    async updateMovie(){
        const updateMovieId = await Promise.resolve(moviesMock[0].id)
        return updateMovieId || {}
    }
    async deleteMovie(){
        const deletedMovieId = await Promise.resolve(moviesMock[0].id)
        return deletedMovieId || {}
    }    
}

module.exports = MoviesService