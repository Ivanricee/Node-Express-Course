const express = require('express')
const supertest = require('supertest')

function testServer(route){
    //una app diferente a la principal, solo para test
    const app = express();
    route(app)
    return supertest(app)
}

module.exports = testServer