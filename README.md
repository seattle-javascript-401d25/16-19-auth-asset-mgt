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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiJjZGUzODhhZTgxYzU3NjlmMDhiNmY5MGE2YmZmYWNiMzY5ZWUxYTQ5YTUxZDZjZGE5NjM3YTA4ZTY1YzZhMTkyNTcyZTljYWQ4YjZjOTNiOWU1NzEzYjkyNjhhOTU1NjFhNzIzZDQyZGZiMzY4ZWEzNDg2Zjk0ZWRhNjlhZmM2NzhmOGE0Y2NhNGIxMGQyMTA2ZDA5MWNhZjQ5ZTk3YjRhNmRiM2IxMGM4Zjk5ZjE3MmM3NWU5MjdiNzNjNmNhNmEzZGQ5ZTQ3ZWJjYjdjYTdiZWQzNjBiN2RhOGNiZmFiY2ZiZTk0YzI4NjUzNzkyYzk4NzI3YmNhNmFkMDBjOGQzIiwiaWF0IjoxNTMwNTc1NTAzfQ.2d4-xoH1uMJqJ1gKon4CjhzqWeNtynVWsT4NRONZM34"
}
```

Returns 409 if username and email aren't unique, 400 if request is missing any required information.

#### GET /api/login

This route requires the username and password to be base64 encrypted and included as the request header's Authentication tag.

```
http -a Larry:McMurtry localhost:3000/api/login

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiJhNmQzY2ZlMzA2OTczZmUyNzQ5OTg2ZDFkODBiMTMyYzhhY2VhY2IwMGM1MTVlYTExNWVkNGQ3YzNhMDYxMDQzYzI1ZGRlNjcxNTE1MGQ0MzIzYTRhZmMwYzg1OTQwZjA4N2ViNzE1MjMxN2FjODliYzY2Zjg3NjI2YzdiZDZlY2JhYjE3ODZmNGNkZDAzZGM3NmZmZjA5MjExMjYwM2MxMzY5MmU5YTI0NGQ2ZGI3NzBlZDM4OTQzOTA4ZjJiMGQ0MTBjMDg2MWMzMzdlMzFmYzM3OTEyYzNlMDY1MmYxNDUwMGZmYWJmODQwOThiODk0OWNkNzE5MzFjMzBkOTZiIiwiaWF0IjoxNTMwNTc1OTUwfQ.sY9IlAs0QbkiNPd9Aiisstk2GctDAPsSxRhRuQ4v7oA"
}
```

Returns 400 if username not found, 500 if password is incorrect (as a benefit to hackers everywhere).



