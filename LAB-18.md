![cf](https://i.imgur.com/7v5ASc8.png) Lab 18: Authorization - File Management
======

## Submission Instructions
* Continue from previous authorization labs.
* Submit on canvas: 
  * an observation
  * your original time estimate
  * how long you spent
  * a link to your pull request
  * a link to your deployed Heroku URL (same as previous labs, but with updated changes deployed)
  * **A 0 will be given for failing PRs, no Travis CI hookup, or no Heroku URL**
   * an attached screenshot that shows you succesfully uploaded a Multer hash-named file to your AWS S3 bucket, i.e. ![a screenshot of your bucket that shows the hashed file name provided by Multer](https://github.com/seattle-javascript-401d25/16-19-auth-asset-mgt/blob/master/Capture.PNG)
  * *No 0 will be issued if you can't achieve a real upload to your bucket, but you will be docked points accordingly*

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoose guide](http://mongoosejs.com/docs/guide.html)
* [mongoose api docs](http://mongoosejs.com/docs/api.html)
* [aws sdk](https://github.com/aws/aws-sdk-js)
* [aws sdk s3 docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
* [aws sdk mock docs](https://github.com/dwyl/aws-sdk-mock)

## ENV Variable Setup
* **DO NOT PUSH UP YOUR AWS KEYS, ENSURE YOUR ENV FILE IS PROPERLY GITIGNORED.** 
* Your `.env` file should now look like this:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost/testing (*testing* can be any name you want)
SECRET_KEY=random stuff here ( *SECRET_KEY* can be named anything you want as long as you're consistent in your code)
AWS_BUCKET=your_bucket_name
AWS_SECRET_ACCESS_KEY=your_access_key
AWS_ACCESS_KEY_ID=your_access_key_id
```
* The `AWS` variables above **must be EXACTLY formatted in that way or things will break**. 
* Ensure you also make appropriate changes to your `test.env.js` module per today's lecture code. Reference the corresponding `test.env.js` in lecture code and adjust your `test.env.js` accordingly. 
* Add your `env` variables to Heroku as well for a successful deployment. Go to your app's `Settings` tab and click the button `Reveal Config Vars` to add them accordingly. **You must provide your real AWS access key information to Heroku for your deployed app to work**

![Go to your app's `Settings` tab and click the button `Reveal Config Vars` to add them accordingly.](https://github.com/seattle-javascript-401d25/16-19-auth-asset-mgt/blob/master/heroku.png) 

## Feature Tasks  
Create a third model that represents a file asset. The file should be stored on AWS S3, and metadata about the file should be stored in your mongo database.  
  
#### File Asset Model
Create a model with at least 4 properties that represents some type of file asset (BLOB) resource (image, audio, movie, 3d file). **Please do not use a "Sound" model like lecture code**. One of the model's properties should map back to a corresponding account id. Two of the properties should be `url` and `fileName` and should hold an AWS Location and AWS Key after getting a response back from AWS for a successful file upload.


#### Server Endpoints
* `POST /<resource-name>` 
  * pass a bearer authentication token in the request to authorize the creation of the resource
  * pass data as `multipart/form-data` in the body of a **POST** request to create a new resource
    * should include an attached file asset
  * on success respond with a 200 status code and a json representation of the resource
  * on failure due to a bad request send a 400 status code
  * on failure due to bad token or lack of token respond with a 401 status code
* `GET /<resource-name>/:id` 
  * pass a bearer authentication token in the request to authorize the creation of the resource
  * on success respond with a 200 status code and a json representation of the resource
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code
* `DELETE /<resource-name>/:id` 
  * pass a bearer authentication token in the request to authorize the deletion of the resource
  * on success respond with a 204 status code
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code
  
## Tests
* Write 200, 400, and 401 tests for `POST /<resource-name>`
* Write 200, 404, and 401 tests for `GET /<resource-name>/:id`
* Write 204, 404, and 401 tests for `DELETE /<resource-name>/:id`

## Documentation
Same as previous labs with documentations on updated routes. 

## Stretch Goals
It is the 4th of July. Why do you want to do this?
