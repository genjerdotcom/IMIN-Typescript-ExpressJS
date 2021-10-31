# IMIN Typescript ExpressJS REST API

CRUD Ingredient using Typescript & ExpressJS

## Getting started
### Requirements

- NodeJS v12.12.0 Or higher
- PostgreSQL 12 / pgadmin 4.19 (tested)

### Database ERD

![Database ERD](db_design.jpg)

### Features

#### 1. Unit of Measurement
- User can View all Unit of Measurement
- User can Add the Unit of Measurement
- User can Edit the Unit of Measurement
- User can Delete Unit of Measurement

#### 2. Ingredient State
- User can View all Ingredient State
- User can Add the Ingredient State
- User can Rename the Ingredient State
- User can Delete Ingredient State
- User can assign Ingredient State to certain ingredients

#### 3. Ingredient Type
- User can View all Ingredient Type
- User can Add the Ingredient Type
- User can Rename the Ingredient Type
- User can Delete Ingredient Type
- User can assign Ingredient Type to certain ingredients

#### 4. Ingredient Library
- User can View all Ingredients
- User can Add Ingredients
- User can Edit Ingredients
- User can Delete Ingredients
- Stock inputted into Inflow can be displayed under “Current Stock” column

#### 5. Inflow
- User can View Inflows
- User can Add Inflows
- User can Delete Inflows
- Quantity added in Inflows will be reflected in Ingredient Library


### Installation

copy `.env-example` and rename to `.env` 

```

NODE_DEV=development
APP_PORT=8000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=<YOUR_DB_NAME>
DB_USER=<YOUR_DB_USER>
DB_PASSWORD=<YOUR_DB_PASS>

JWT_SECRET_KEY=ginanjardp

```

Install dependency
```
npm install

npm audit fix

```

Run Migration

```
./node_modules/.bin/sequelize-cli db:migrate
```

Build Code

```
npm run tsc
```

Build & Watch
```
npm run tsc
```

Run Application
```
npm run dev
```


### Test Endpoint with Postman

- Import `collection` from `postman/collection/IMIN.postman_collection.json`
- Import `environtment` Collection from `postman/environtment/ENV_LOCAL_IMIN.postman_environment.json`

Fill Environtment Postman `token` & `port`

Open collection in folder `IMIN/Authentication` on your postman. Register & Login first

Register Body Raw Json
```

{
    "username":"administrator",
    "password": "123456"
}

```

Login Body Raw Json
```

{
    "username":"administrator",
    "password": "123456"
}

```

Results Login 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbmlzdHJhdG9yIiwicGFzc3dvcmQiOiIkMmIkMTAkaUwyN3VzWGs2cjE2YlcyUlpaYm5WZUhrckJmaGd5NEZkcVFIWHZ2NmwyLlBqNGtmNktRSTYiLCJpYXQiOjE2MzM4OTUyMjV9.-2XC1v9ai9bbl_HeCIXeQeJYIhsPak0-hM3PsRcOS1Q"
}
```

copy token into environtment `Postman`


![Database ERD](postman_ss.png)


### Thank You 

GinanjarDP
[Linkeddin](https://id.linkedin.com/in/ginanjar-putranto-0416a913b)