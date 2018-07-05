![cf](https://i.imgur.com/7v5ASc8.png) Lab 19: Load Testing
======

## Submission Instructions
* Continue from previous authorization labs in a new branch `lab-19`.
* Submit on canvas: 
  * an observation
  * your original time estimate
  * how long you spent
  * a link to your pull request
  
 ## Configuration
 * Globally install `artillery` by typing `npm i -g artillery` in your terminal
 * Create a directory called `load-testing` that **sits at the root of your previous lab project, i.e. at the same level as package.json, .gitignore, .env. etc.**
 * Add `**/load-testing/*` to your `.eslintignore` so the linter will ignore errors

## Resources
* [Artillery Docs Getting Started](https://artillery.io/docs/getting-started/)
* [Artillery Docs Testing HTTP](https://artillery.io/docs/http-reference/#extracting-and-reusing-parts-of-a-response-request-chaining)
* [Artillery Docs Script Reference](https://artillery.io/docs/script-reference/)
* [Artillery Docs CLI Reference](https://artillery.io/docs/cli-reference/)

## Feature Tasks  

### Load Testing Your API
* Load test your `POST /api/signup` route through either your `localhost:3000` server, or your deployed Heroku app URL. (Be careful of overdoing it on your Heroku app, as they may send you email warnings that your app is getting a DDOS attack). 

* Create a `load-test-create-user` module that will generate random user data through the use of `faker` and `uuid`. 

* Create one or more `json` files that configures the environment for your Artillery test to run on. Play around with the numbers for various phases until you find the maximum number of requests your API can make until it breaks. 

* Remember, in this context, "breaking" doesn't mean any 400-range errors from your API itself. Breaking means `ECONNREFUSED` from localhost or `503` errors from Heroku - basically, anything that indicates your request never completed because you overloaded the server. 

## Documentation
This lab is less about the code and more about your ability to analyze test results and communicate them clearly to a potential client or executive team. Remember, your audience may not be as technically knowledgeable as you. 

In your default README.md, include a new heading called "**Load Testing Analysis**". Use this section to describe the results of your load tests. Be sure to clarify if you are testing on `localhost:3000` or your Heroku app. If you are testing Heroku, clarify that you are using the free tier option for Heroku. 

Explain terms such as RPS, latency, and percentiles to your reader, and describe what the numbers mean in terms of the performance of your app. Explain the differences between latency and response time. Explain the type of scenarios you used (in the case of this lab's MVP, only a POST request to `/api/signup` is all you have to address). 

While not required, **try to include the charts that Artillery generates to aid in visualization of your written analysis**. 

## Helpful Artillery CLI Commands
* To run your test:
  * `artillery run <your-load-test.json>`
* To generate a `json` file of your test results
  * `artillery run <your-load-test.json> -o <arbitrary-name-of-your-new-json-file>`
* To generate an HTML document that shows charts of your results:
  * `artillery report <name-of-json-file-you-generated-in-previous-command.json>`

## Stretch Goals
Explore the Artillery docs linked above to add more complex configurations and Javascript code to your tests. Try to figure out how to test your additional routes, and include those additional test results in your analysis. 
