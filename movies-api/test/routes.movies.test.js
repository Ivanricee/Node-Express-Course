const assert = require('assert')
const proxyquire = require('proxyquire');


//los mocks nos ayudan a verificar que esta funcionando correctamente
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js')


const testServer = require('../utils/testServer');

//escribir test
//describe -> es lo que escribe en la consola y de callback recibe una funcion
describe('routes - movies', function () {
    //en este caso nuestra ruta va a ser intervenida por prozyquire
    const route = proxyquire('../routes/movies', {
        //la inclusion de este servicio
        '../services/movies': MoviesServiceMock
        //va a ser remplazado por MoviesSerceMock
    });
    //luego creamos un request usando testServer de nuestra ruta interceptada
    const request = testServer(route)
    describe('GET /movies', function () {
        it('should respónd with status 200', function (done) {
            request.get('/api/movies').expect(200, done)
        })
        //responde con la lista de peliculas
        // la palabra done  se utiliza para que el test se de cuenta
        //cuando finalizao, como esta tiene un callback hay qye decirle 
        //donde finaliza
        it('should respond wit the list of the movies', function (done) {
            request.get('/api/movies').end((err, res) => {
                //deep equal es para comparar objetos
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })
                done()
            })

        })


    })
})

