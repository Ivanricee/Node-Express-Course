/*const assert = require('assert')
const proxyquire = require('proxyquire')

const {MongoLibMock,getAllStub} = require('../utils/mocks/mongoLib.js')
const {moviesMock} = require('../utils/mocks/movies')

describe("services - movies", function(){
    const MoviesServices = new proxyquire('../services/movies.js',{
        '../lib/mongo.js':MongoLibMock
    })
    const MoviesService = new MoviesServices();
    
    describe("when getMovies mothod is called", async function(){
        it('should call the getall MongoLin method',async function(){
            await MoviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true)
        })
    })
})*/