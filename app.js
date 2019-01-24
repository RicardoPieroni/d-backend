'use strict';

const fs = require('fs'),
    path = require('path'),
    http = require('http');

const app = require('connect')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = 3006;
const mongoose = require('mongoose');
const config = require('./config');

function initilizeMongoose(callback) {
  mongoose.Promise = Promise;
  return mongoose.connect(config.mongo.uri).then(() => {
      Object.keys(config.mongo.options).forEach((key) => {
          mongoose.set(key, config.mongo.options[key]);
      });

      mongoose.Types.ObjectId.prototype.view = () => ({ id: this.toString() });

      mongoose.connection.on('error', (err) => {
          process.exit(-1);
      });
  }).then(() => {
      callback();
  });
}

// swaggerRouter configuration
const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './src/adapters/api/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'./src/adapters/api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  initilizeMongoose(() => {
  
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
  
    // Validate Swagger requests
    app.use(middleware.swaggerValidator());
  
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));
  
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  
    // Start the server
    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
  });

});
