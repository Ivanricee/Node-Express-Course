const MongoLib = require('../lib/mongo')

class UserMoviesService{
    constructor(){
        this.collection = 'user-movies'
        this.mongoDB = new MongoLib()
    }

    async getUserMovies({userId}){
        const query = userId && {userId}
        const userMovie = await this.mongoDB.getAll(this.collection,query)

        return userMovie || []
    }

    async creteUserMovies({userMovie}){
        const createUserMovieId = await this.mongoDB.create(
            this.collection, 
            userMovie)
        return createUserMovieId
    }

    async deleteUsersMovie({userMovieId}){
        const deleteUserMovieId = await this.mongoDB.delete(
            this.collection, 
            userMovieId)
        return deleteUserMovieId
    }
}

module.exports = UserMoviesService