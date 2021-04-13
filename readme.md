<h1 align="center">Admin Api</h1>

<p align="center">
  <a href="#-project">Project</a>;
  <a href="#-technologies">Technologies</a>;
  <a href="#-usage">Usage</a>
</p>

## Project

Project with CRUD operations that simulates inventory operations.

## Technologies

The project was developed with [Node.js](https://nodejs.org/en/download) and using the following technologies:

- Main Libs
  - [Express](https://expressjs.com)
  - [Typescript](https://www.typescriptlang.org/)
  - [Sequelize](https://sequelize.org/master/identifiers.html)
  - [Joi](https://joi.dev/api/?v=17.4.0)
- Style
  - [ESLint](https://eslint.org)

## Prerequisites

You will need Node.js and MySql before following the instructions below.

The project can be built with npm or Yarn, so choose one of the approach bellow in case you don't have any installed on your system.

- **npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer.
- **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general. [Download Yarn](https://yarnpkg.com/en/docs/install).

## Usage

- Clone the repository with `git clone https://github.com/matheus-schlosser/node-admin-api.git`
- Acess the repository with admin-api `cd node-admin-api`
- Install dependencies with `npm install` or `yarn install`
- Create the .env file. You can use the file .env.example as example 
- Check if you already have a schema called ** admin_api ** on database. If you don't have, create it! 
- Create and migrate your database with `yarn mysql:migrate -e local`
- Start the application with `npm install` or `yarn start`

It will start your server on [`localhost:5001`](http://localhost:5001) and show the message:

> START PROCESS ON local MODE  
> SERVER ON PORT 5001  
> Executing (default): SELECT 1+1 AS result

Obs.: To use the project routes, the token got on login must be provided in the requisition header.

- You can run the tests with ` yarn test or yarn run test` 

## Usage with Docker

If you want to use docker, you will need to have docker and docker-compose installed. 
After you can run the following commands:

- `sudo docker-compose build`
- `sudo docker-compose up`

Obs.: This commands just run the application, but it's necessary create the database and run the migrations.
To create the database tables you can use the file sql-queries.

## Routes Documentation

To view the documentation of the API routes: 
   
- Start the application with `npm install` or `yarn start`
- Acess: `http://localhost:5000/api-docs`
