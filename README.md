# D-backend

## Overview
This server manage data to d-frontend

## Beginning
---
* Must have mongodb installed
* Create a .env file on the root directory with the following content:	

> MONGOOSE_URI=mongodb://localhost/d-database

> ACCESS_CONTROL_URL="*"

> ACCESS_CONTROL_HEADERS="Origin, X-Requested-With, Content-Type, Accept, Authorization"

* Must exec two commands to populate the database (this commands should be executed on the root of project):
> mongo scripts/database/populate/ingredient-populate.js

> mongo scripts/database/populate/food-populate.js 


### Running the server
To run the server, run:

```
npm start
```
### Running the test
To run the unit tests, run:

```
npm test
```

To view the Swagger UI interface:

```
open http://localhost:3006/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.
