![cf](https://i.imgur.com/7v5ASc8.png) Lab 16: Basic Authentication
======

[![Build Status](https://travis-ci.com/TCW417/16-19-auth-asset-mgt.svg?branch=master)](https://travis-ci.com/TCW417/16-19-auth-asset-mgt)

This lab implements a basic authentication API.

### Routes

#### POST /api/signup

This route creates a new user account.  The body of the request must include a username, password and email.

```
http POST localhost:3000/api/signup username=Larry password=McMurtry email='lonesome@dove.com'

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 479
Content-Type: application/json; charset=utf-8
Date: Mon, 02 Jul 2018 23:51:43 GMT
ETag: W/"1df-QcYUBHTXhq3c2S6xNl8ELjEnYkY"
X-Powered-By: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI3ODRlMmViOTFmMDYwNzM3OGM4OTY3YzM1YmU0NDEyYjhiN2NmMzUwOWEyZjJlN2QiLCJpYXQiOjE1MzA2NTYzOTh9.Eq0g-0LulEn5G5JrQ5XRMsREklYV5KuVhEcuq6PREYY"
}
```

Returns 409 if username and email aren't unique, 400 if request is missing any required information.

#### GET /api/login

This route requires the username and password to be base64 encrypted and included as the request header's Authentication tag. The route returns a JSON Web Token whose payload includes the database ID or the user's profile. This can be used in a subsequent GET /api/profiles request.

```
http -a Larry:McMurtry localhost:3000/api/login

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiIyMGNiZmExODFmZmZhYTk4ZGRkMDEzNDExMTM4NDI2YmUwZGU2NTY0NTBhYTA3ZWIiLCJpYXQiOjE1MzA2NTY2MzZ9.0XAT9ltDxe34pxpVZwKLb17b7n6ZpKj_N04wVwviTLg"
}
```

Returns 400 if username not found, 500 if password is incorrect (as a benefit to hackers everywhere).

#### POST /api/profiles

Create a profile for an existing Account.  Requires a firstName and Account ID (provided by the GET /api/login route). Other properties are lastName, location, profileImageUrl, and bio.  Returns status code 200 on success.
```
request body = {
    firstName: 'Larry',
    lastName: 'McMurtry',
    location: 'Souix Falls, SD',
    bio: 'A great american author.',
    accountId: '5b3bf68e06fde67494fa7ab0'
}
```
Returns
```
{
    "_id": "5b3bf93461e2a6754b1c8cf3",
    "firstName": "Larry",
    "lastName": "McMurtry",
    "location": "Souix Falls, SD",
    "bio": "A great american author.",
    "accountId": "5b3bf68e06fde67494fa7ab0",
    "__v": 0
}
```
Returns 404 if accountId does not exist, 400 if badly formed request.

#### GET /api/profiles[?id=accountId]

With no query string, returns an array of all profiles:
```
[
    {
        "_id": "5b3bf93461e2a6754b1c8cf3",
        "firstName": "Larry",
        "lastName": "McMurtry",
        "location": "Souix Falls, SD",
        "bio": "A great american author.",
        "accountId": "5b3bf68e06fde67494fa7ab0",
        "__v": 0
    }
]
```
With an id query (id is the profile _id property, not the accountId property), returns the specific profile:
```
{
    "_id": "5b3bf93461e2a6754b1c8cf3",
    "firstName": "Larry",
    "lastName": "McMurtry",
    "location": "Souix Falls, SD",
    "bio": "A great american author.",
    "accountId": "5b3bf68e06fde67494fa7ab0",
    "__v": 0
}
```
Returns 404 if profile isn't found, 401 on bad token, 400 if query is badly formed.




