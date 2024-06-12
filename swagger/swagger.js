const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'AxlouToth API',
        description: 'AxlouToth API Documentation',
    },
    host: 'localhost:3000',
    schemes: ['http'],

};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../index');
});
