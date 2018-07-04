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
  * an attached screenshot that shows you succesfully uploaded a file to your AWS S3 bucket, i.e. [a screenshot of your bucket that shows the hashed file name provided by Multer](https://judyvue-401d25.s3.us-west-2.amazonaws.com/10871377b5c7bf674821c70427031d7d.Capture.PNG)
  * **A 0 will be given for failing PRs, no Travis CI hookup, or no Heroku URL**
  * No 0 will be issued if you can't achieve a real upload to your bucket, but you will be docked points accordingly

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoose guide](http://mongoosejs.com/docs/guide.html)
* [mongoose api docs](http://mongoosejs.com/docs/api.html)
* [aws sdk](https://github.com/aws/aws-sdk-js)
* [aws sdk s3 docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
* [aws sdk mock docs](https://github.com/dwyl/aws-sdk-mock)

## Feature Tasks  
Create a third model that represents a file asset. The file should be stored on AWS S3, and metadata about the file should be stored in your mongo database.  
  
#### File Asset Model
Create a model with at least 4 properties that represents some type of file asset (BLOB) resource (image, audio, movie, 3d file). One of the model's properties should map back to a corresponding account id. One of the properties should be `url` and should hold an AWS Location.


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
