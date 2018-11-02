# Cocktail-app

> An app to create, store, edit, and share cocktail recipes.  



## Installation

- This app requires node(it is built with v9.6.1) and postgreSQL(this app is built with v10.5).  
- This app also requires the following packages:   
    jasmine: version 3.2.0   
    request: version 2.83.0  
    bcryptjs: version 2.4.3  
    body-parser: version 1.18.3  
    dotenv: version 5.0.0  
    ejs: version 2.5.7  
    express: version 4.16.2  
    express-flash: version 0.0.2  
    express-session: version 1.15.6  
    express-validator: version 5.3.0   
    passport: version 0.4.0  
    passport-local: version 1.0.0  
    pg: version 7.4.1  
    pg-hstore: version 2.3.2  
    sequelize: version 4.32.6  
    sequelize-cli: version 5.2.0  
### Clone

- Clone this repo to your local machine using `https://github.com/Justinelliott11375/cocktail-app/`

### Setup

- This app will require 2 postgres databases: one named "cocktail-dev" for development environment, and one named "cocktail-test" for test environment. With postgres installed, these can be created from the command line with:  
`createdb -U postgres -w cocktail-dev` and  
`createdb -U postgres -w cocktail-test` 
- To run/test the app, create a .env file in the main directory and add the following line to it:  
cookieSecret="SECRET1"
Run `npm start` in the command line and the server should start at address `localhost:3000`

## Features

- creating a user account  
- Signing in as an existing user
- creating a recipe list 
- creating recipe cards for recipe lists
- editing/updating/deleting recipe cards and/or lists
- signing out of the user account

## Tests (Optional)

- This app uses jasmine test suites for testing. With jasmine installed you can run all tests from the command line with `npm test`

## Technologies

- JavaScript(ES6), node, npm, postgres

---

## Author

> Justin Elliott
