# Overview
The app is using 
- NodeJS 
- ReactJS framework 
- MongoDB - Mongoose 
- JWT Token
- Passport for Authentication  

# Use case 
This is a sample products store , With a demo content added to mongo db
- Anyone can get all items stored in the database.
- A user can make an order of items.
- When a user sets an order, he should receive a confirmation email.
- When a user sets an order, the service should only place the order in a job queue.
- A user can get a history of all his previous orders.
- An admin can get all users alongside their previous orders.

# Getting started
Before you start you should have a recent version of `npm` and `node`
installed.

# Prerequisites 
Navigate to mailingService.js at (server\services) folder and change [mailAccountUser, mailAccountPassword] to your business email and password. 

# 1.0 Clone
```
  git clone https://github.com/wa2elgomaa/nodejs-reactjs.git
  
```
# 2.0 Installing 
Navigate to the "server" directory inside the cloned folder and run 
```
  npm install
  npm start
```
To see whether the server works check <http://localhost:3000> and you should see json object.

Navigate to the "client" directory inside the cloned folder and run 
```
npm install
```
Navigate to the cloned directory and run 
```
npm install
npm start
```
The development server should open a new tab at your browser. Your application should be working on http://localhost:8080.



