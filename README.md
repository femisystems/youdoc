# Youdoc

[![Build Status](https://travis-ci.org/andela-fabolaji/youdoc.svg?branch=master)](https://travis-ci.org/andela-fabolaji/youdoc) [![Code Climate](https://codeclimate.com/github/andela-fabolaji/youdoc/badges/gpa.svg)](https://codeclimate.com/github/andela-fabolaji/youdoc) [![Test Coverage](https://codeclimate.com/github/andela-fabolaji/youdoc/badges/coverage.svg)](https://codeclimate.com/github/andela-fabolaji/youdoc/coverage) [![Issue Count](https://codeclimate.com/github/andela-fabolaji/youdoc/badges/issue_count.svg)](https://codeclimate.com/github/andela-fabolaji/youdoc)

Youdoc is a modern, light-weight document manager built on **PERN** (Postgres, Express, React, Node).

## Development
The application leverages Node; Express for routing and sequelize for ORM.

## Installation
> - Install `node` and `postgres`
> - Clone the repository git clone git@github.com:andela-fabolaji/youdoc.git
> - Switch to project directory `cd ~/path/to/youdoc`
> - Install dependencies `npm i`
> - Test `npm test`
> - Start app `npm start`
> - Consume via postman

## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/89e2db021ae017f6bc7f)

## Endpoints
### Roles

| Verb     | Endpoint    | Action         |
| :------- | :---------- | :------------- |
| POST     | [/roles](#Roles)      |  Create role   |
| GET      | /roles      |  Get roles     |
| GET      | /roles/:id  |  Get a role    |
| PUT      | /roles/:id  |  Update a role |
| DELETE   | /roles/:id  |  Delete a role |

### Users
| Verb     | Endpoint              | Action                  |
| :------- | :-------------------- | :---------------------- |
| POST     | /users                |  Create user            |
| POST     | /users/login          |  Create user            |
| GET      | /users                |  Get all users          |
| GET      | /users/:id            |  Get single user        |
| GET      | /users/:id/documents  |  Get a user's documents |
| PUT      | /users/:id            |  Update a user          |
| DELETE   | /users/:id            |  Delete a user          |

### Types (Document types)
| Verb     | Endpoint    | Action         |
| :------- | :---------- | :------------- |
| POST     | /types      |  Create a type |
| GET      | /types      |  Get types     |
| GET      | /types/:id  |  Get a type    |
| PUT      | /types/:id  |  Update a type |
| DELETE   | /types/:id  |  Delete a type |

### Documents
| Verb     | Endpoint        | Action             |
| :------- | :-------------- | :----------------- |
| POST     | /documents      |  Create a document |
| GET      | /documents      |  Get documents     |
| GET      | /documents/:id  |  Get a documents   |
| PUT      | /documents/:id  |  Update a document |
| DELETE   | /documents/:id  |  Delete a document |

### Search
`hostUrl/documents/search?q=<text>&type=<sometype> - GET`

## Roles
#### Create a role
```
Endpoint: POST /roles
Authorization: Requires authorization and admin access
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get roles
```
Endpoint: GET /roles
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully retrieved.",
  "data": [
    {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-03-05T06:47:20.058Z",
      "updatedAt": "2017-03-05T06:47:20.058Z"
    },
    {
      "id": 2,
      "title": "consultant",
      "createdAt": "2017-03-05T06:47:20.058Z",
      "updatedAt": "2017-03-05T06:47:20.058Z"
    },
    {
      "id": 3,
      "title": "facilitator",
      "createdAt": "2017-03-05T06:47:20.058Z",
      "updatedAt": "2017-03-05T06:47:20.058Z"
    },
    {
      "id": 4,
      "title": "fellow",
      "createdAt": "2017-03-05T06:47:20.058Z",
      "updatedAt": "2017-03-05T06:47:20.058Z"
    }
  ]
}
```

#### Get a role
```
Endpoint: GET /role/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully retrieved.",
  "data": {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-03-05T06:47:20.058Z",
    "updatedAt": "2017-03-05T06:47:20.058Z"
  }
}
```

#### Update a role
```
Endpoint: PUT /role/:id
Authorization: Requires authorization
```

```
Request

{
  "title": "super consultant"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully updated.",
  "data": {
    "id": 2,
    "title": "super consultant",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Delete a role
```
Endpoint: DELETE /roles/:id
Authorization: Requires authorization
```

## Users
#### Create a user
```
Endpoint: POST /users
Authorization: NA
```

```
Request

{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get users
```
Endpoint: GET /users
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get a user
```
Endpoint: GET /users/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Update a user
```
Endpoint: PUT /users/:id
Authorization: Requires authorization
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Delete a user
```
Endpoint: DELETE /users/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

## Types
#### Create a type
```
Endpoint: POST /roles
Authorization: NA
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get documents
```
Endpoint: GET /documents
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get a document
```
Endpoint: GET /documents/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Update a document
```
Endpoint: PUT /documents/:id
Authorization: Requires authorization
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Delete a document
```
Endpoint: DELETE /documents/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

## Documents
#### Create a document
```
Endpoint: POST /documents
Authorization: NA
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get documents
```
Endpoint: GET /documents
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Get a document
```
Endpoint: GET /documents/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Update a document
```
Endpoint: PUT /documents/:id
Authorization: Requires authorization
```

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}

Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```

#### Delete a document
```
Endpoint: DELETE /documents/:id
Authorization: Requires authorization
```

```
Response
{
  "success": true,
  "msg": "role(s) successfully created.",
  "data": {
    "id": 2,
    "title": "deck admin",
    "updatedAt": "2017-03-06T12:18:51.142Z",
    "createdAt": "2017-03-06T12:18:51.142Z"
  }
}
```