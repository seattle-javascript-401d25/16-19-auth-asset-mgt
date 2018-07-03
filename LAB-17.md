![cf](https://i.imgur.com/7v5ASc8.png) Lab 17: Bearer Authorization
======

## Submission Instructions
* Continue from Lab 16 in a new branch called `lab-17`
* Submit on canvas:
  * your original time estimate
  * how long you spent
  * link to your pull request
  * link to your deployed Heroku URL that registers with your updated changes (it can be the same as what you submitted for Lab 8)
  * **A 0 will be given for failing PRs, no Travis CI hookup, or no Heroku URL**

## Feature Tasks  

### Bearer Auth middleware 
Create middleware for parsing a Bearer Authorization header, it should add an Account to the request object.

### Access controlled resource 
Create a model with at least four properties that belongs to an account. The model should require an account id associated to an account. It is OK if you want to use a `Profile` model as demonstrated in lecture.

### Server Endpoints
* `GET /login` (Auth Route)
  * Create a login route that uses the basic authentication middleware to log in a user.
* `POST /<resource-name>` 
  * pass a bearer authentication middleware in the request to authorize the creation of the resource
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code
  * **OR** on failure due to bad token or lack of token respond with a 401 status code
* `GET /<resource-name>/:id` 
  * pass a bearer authentication middleware in the request to authorize the creation of the resource
  * on success respond with a 200 status code and a resource
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code

## Tests
* Write your additional tests utilizing the new [ES7 async/await syntax](https://javascript.info/async-await)
* Write 200, 400, and 401 **OR** 404 tests for `/login` (Auth router)
* Write 200, 400, and 401 **OR** 404 tests for `POST /<resource-name>`
* Write 200 and 401 **OR** 404 tests for `GET /<resource-name>/:id`
* **This will involve changing the 400 error codes I already gave you to a 401 or 404. Think about the most appropriate place in the code that should be changed to a more appropriate error code instead, and change it there.**

## Documentation
Same as previous lab, with addition of new routes for this lab. 

## Stretch Goal
* Refactor your Lab 16 tests using `async/await`
* Refactor all of your mocks using `async/await`
* Test your  `GET /<resource-name>/:id` route to ensure it returns an array of available profiles in your database 
* In order to achieve the above goal, you'll need to create multiple users in your database for testing purposes. HINT: [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will help you out here. 

* Create an extra model that would be the `many` in a `one-to-many` relationship with your `Profile` model, and test for full-CRUD on that model. 
* Read about and try to utilize [ES6 generators](https://medium.com/front-end-hacking/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433) to handle async code in your tests. 
* Sign up for a free [swagger.io](https://app.swaggerhub.com) account and try to utilize this free app to make an awesome interactive README for your API. 
