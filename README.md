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
- [Roles](#roles)
  - [Create role](#create-role) 
  - [List roles](#list-role)
  - [Get role](#get-role) 
  - [Delete role](#delete-role) 
- [Users](#users)
  - [Create user](#create-user)
  - [List users](#list-users)
  - [Get user](#get-user)
  - [Update user](#update-user)
  - [Delete user](#delete-user)
  - [List user documents](#list-user-documents)
  - [Login](#login)
  - [Logout](#logout)
- [Types](#types)
  - [Create types](#create-type)
  - [List types](#list-types) 
  - [Update type](#get-type) 
  - [Delete type](#delete-type) 
- [Documents](#documents)
  - [Create document](#create-document)
  - [List documents](#list-documents)
  - [Get document](#get-document)
  - [Update document](#update-document)
  - [delete document](#delete-document) 
- [Search](#search)

## Roles
| Verb     | Endpoint    | Action         |
| :------- | :---------- | :------------- |
| POST     | /roles      |  Create role   |
| GET      | /roles      |  Get roles     |
| GET      | /roles/:id  |  Get a role    |
| DELETE   | /roles/:id  |  Delete a role |

#### Create role
> - Endpoint: **POST** `/roles`
> - Authorization: Requires authorization and admin access
```
Request
{
  "title": "deck admin"
}
```
```
Response 
Status: 201 created

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

#### List roles
> - Endpoint: **GET** `/roles`
> - Authorization: Requires authorization and admin access
```
Response
Status: 200 ok

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
    }
  ]
}
```

#### Get role 
> - Endpoint: GET `/role/:id`
> - Authorization: Requires authorization and admin access
```
Response
Status: 200 ok

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

#### Delete role
> - Endpoint: **DELETE** `/roles/:id`
> - Authorization: Requires authorization and admin access
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "role(s) successfully deleted.",
}
```

## Users
| Verb     | Endpoint              | Action                  |
| :------- | :-------------------- | :---------------------- |
| POST     | /users                |  Create user            |
| POST     | /users/login          |  Create user            |
| GET      | /users                |  Get all users          |
| GET      | /users/:id            |  Get single user        |
| GET      | /users/:id/documents  |  Get a user's documents |
| PUT      | /users/:id            |  Update a user          |
| DELETE   | /users/:id            |  Delete a user          |

#### Create user
> - Endpoint: **POST** `/users`
> - Authorization: NA
```
Request
{
  "firstName": "john"
  "lastName": "smith",
  "email": "smith@youdoc.com"
  "username": "johnsmith",
  "password": "password"
}
```
```
Response
Status: 201 created

{
  "success": true,
  "msg": "user(s) successfully created.",
  "data": {
    "credential": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJuYW1lIjoiam9obnNtaXRoIiwicm9sZSI6InJlZ3VsYXIiLCJpYXQiOjE0ODg5MzI3NzksImV4cCI6MTQ4OTAxOTE3OX0.au_SBZDUpvfE3e3aiiAggdlh0pnuPUB6etbyYnII7AY",
      "expiresIn": "24 hours"
    },
    "newUser": {
      "role": "regular",
      "id": 9,
      "firstName": "John",
      "lastName": "smith",
      "email": "smith@youdoc.com",
      "username": "johnsmith",
      "password": "$2a$10$2rbahJ0Wp5rECysNBk94rO3EMh1wrfv3eetOXBc63Zwz9ubskoFqW",
      "updatedAt": "2017-03-08T00:26:18.653Z",
      "createdAt": "2017-03-08T00:26:18.653Z"
    }
  }
}
```

#### List users
> - Endpoint: **GET** `/users`
> - Authorization: Requires authorization
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "user(s) successfully retrieved.",
  "data": [
    {
      "id": 1,
      "firstName": "Default",
      "lastName": "User",
      "email": "admin@youdoc.com",
      "username": "admin",
      "role": "admin",
      "createdAt": "2017-03-07T14:17:46.167Z",
      "updatedAt": "2017-03-07T14:17:46.167Z"
    },
    {
      "id": 2,
      "firstName": "Celestine",
      "lastName": "Omin",
      "email": "celestine.omin@youdoc.com",
      "username": "cyberomin",
      "role": "consultant",
      "createdAt": "2017-03-07T14:17:46.378Z",
      "updatedAt": "2017-03-07T14:17:46.378Z"
    }
  ]
}
```

#### Get user
> - Endpoint: **GET** `/users/:id`
> - Authorization: Requires authorization
```
Response
Status: 200 ok
{
  "success": true,
  "msg": "user(s) successfully retrieved.",
  "data": {
    "id": 5,
    "firstName": "Murphy",
    "lastName": "Enaho",
    "email": "enaho.murphy@youdoc.com",
    "username": "murphy",
    "role": "fellow",
    "createdAt": "2017-03-07T14:17:47.012Z",
    "updatedAt": "2017-03-07T14:34:28.178Z"
  }
}
```

#### Update user
> - Endpoint: **PUT** `/users/:id`
> - Authorization: Requires authorization and owner/admn access
```
Request
{
  "firstName": "Enaho",
  "lastName": "Murphy"  
}
```
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "user(s) successfully updated.",
  "data": {
    "id": 5,
    "firstName": "Enaho",
    "lastName": "Murphy",
    "email": "enaho.murphy@youdoc.com",
    "username": "murphy",
    "password": "$2a$10$z8fbTC/bvJfump2tdQ81DeWqEm3JqDUNVs0AYwEq9itfqFEqC6bTi",
    "role": "fellow",
    "createdAt": "2017-03-07T14:17:47.012Z",
    "updatedAt": "2017-03-07T14:34:28.178Z"
  }
}
```

#### Delete user
> - Endpoint: **DELETE** `/users/:id`
> - Authorization: Requires authorization and admin access
```
Response
Status: 201 ok

{
  "success": true,
  "msg": "user(s) successfully deleted."
  }
}
```

#### List user documents
> - Endpoint: **GET** `/users/:id/documents`
> - Authorization: Requires authorization

```
Response
Status: 200 ok

{
  "success": true,
  "msg": "document(s) successfully retrieved.",
  "data": {
    "owner": {
      "firstName": "Murphy",
      "lastName": "Enaho",
      "username": "murphy",
      "role": "fellow"
    },
    "documents": [
      {
        "id": 9,
        "title": "project management",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "ownerId": 5,
        "ownerRole": "fellow",
        "type": "agenda",
        "accessLevel": "public",
        "createdAt": "2017-03-07T14:17:47.064Z",
        "updatedAt": "2017-03-07T14:17:47.064Z"
      },
      {
        "id": 11,
        "title": "weakest link",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "ownerId": 5,
        "ownerRole": "fellow",
        "type": "note",
        "accessLevel": "role",
        "createdAt": "2017-03-07T14:17:47.064Z",
        "updatedAt": "2017-03-07T14:17:47.064Z"
      }
    ]
  }
}
```

#### Login
> - Endpoint: **POST** `/users/login`
> - Authorization: N/A
> - Could be accessed with `email` or `username`.
```
Request
{
  "userIdentity": "shalom.ayidu@youdoc.com"
}
```
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "Welcome shalom! You are now logged in.",
  "userToken": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2hhbG9tIiwicm9sZSI6ImZlbGxvdyIsImlhdCI6MTQ4ODkzNDYxMiwiZXhwIjoxNDg5MDIxMDEyfQ.GMvVQpeONkjoD-qO2-zs35OzhfoQF7cN9QE2HFa_fRc",
    "expiresIn": "24 hours"
  }
}
```

#### Logout
> - Endpoint: **POST** `/users/logout`
> - Authorization: Requires authorization

```
Response
Status: 200 ok

{
  "success": true,
  "msg": "You are now logged out."
}
```

## Types
| Verb     | Endpoint    | Action         |
| :------- | :---------- | :------------- |
| POST     | /types      |  Create a type |
| GET      | /types      |  Get types     |
| GET      | /types/:id  |  Get a type    |
| DELETE   | /types/:id  |  Delete a type |

#### Create type
> - Endpoint: **POST** `/types`
> - Authorization: Requires authorization and admin access
```
Request
{
  "title": "Letter"
}
```
```
Response
Status: 201 created

{
  "success": true,
  "msg": "type(s) successfully created.",
  "data": {
    "title": "letter",
    "updatedAt": "2017-03-08T01:40:55.223Z",
    "createdAt": "2017-03-08T01:40:55.223Z",
    "id": 5
  }
}
```

#### List types
> - Endpoint: **GET** `/types`
> - Authorization: Requires authorization
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "type(s) successfully retrieved.",
  "data": [
    {
      "title": "agenda",
      "createdAt": "2017-03-07T14:17:47.041Z",
      "updatedAt": "2017-03-07T14:17:47.041Z"
    },
    {
      "title": "memo",
      "createdAt": "2017-03-07T14:17:47.041Z",
      "updatedAt": "2017-03-07T14:17:47.041Z"
    }
  ]
}
```

#### Get type
> - Endpoint: **GET** /types/:id`
> - Authorization: Requires authorization

```
Response
Status: 200 ok

{
  "success": true,
  "msg": "type(s) successfully retrieved.",
  "data": {
    "title": "report",
    "createdAt": "2017-03-07T14:17:47.041Z",
    "updatedAt": "2017-03-07T14:17:47.041Z"
  }
}
```

#### Delete type
> - Endpoint: **DELETE** `/types/:id`
> - Authorization: Requires authorization and admin access

```
Request
{
  "title": "deck admin"
  "ownerId": 1  
}
```
```
Response
Stauts: 200 ok
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
| Verb     | Endpoint        | Action             |
| :------- | :-------------- | :----------------- |
| POST     | /documents      |  Create a document |
| GET      | /documents      |  Get documents     |
| GET      | /documents/:id  |  Get a documents   |
| PUT      | /documents/:id  |  Update a document |
| DELETE   | /documents/:id  |  Delete a document |

#### Create a document
> - Endpoint: **POST** `/documents`
> - Authorization: Requires authorization

```
Request
{
  "title": "Alice in wonderland"
  "content": "From Walt Disney Pictures and visionary director Tim Burton comes an epic fantasy adventure, a magical and imaginative twist on some of the most beloved stories of all time",
  "accessLevel": "public",
  "type": "note"
}
```
```
Response
Status: 201 created

{
  "success": true,
  "msg": "document(s) successfully created.",
  "data": {
    "id": 18,
    "title": "Alice in wonderland",
    "content": "From Walt Disney Pictures and visionary director Tim Burton comes an epic fantasy adventure, a magical and imaginative twist on some of the most beloved stories of all time",
    "type": "note",
    "accessLevel": "public",
    "ownerId": 5,
    "ownerRole": "fellow",
    "updatedAt": "2017-03-08T02:19:53.607Z",
    "createdAt": "2017-03-08T02:19:53.607Z"
  }
}
```

#### List documents
> - Endpoint: **GET** `/documents`
> - Authorization: Requires authorization

```
Response
Status: 200 ok

{
  "success": true,
  "msg": "document(s) successfully retrieved.",
  "data": [
    {
      "id": 9,
      "title": "project management",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "ownerId": 5,
      "ownerRole": "fellow",
      "type": "agenda",
      "accessLevel": "public",
      "createdAt": "2017-03-07T14:17:47.064Z",
      "updatedAt": "2017-03-07T14:17:47.064Z",
      "User": {
        "firstName": "Murphy",
        "lastName": "Enaho",
        "username": "murphy",
        "role": "fellow"
      }
    },
    {
      "id": 11,
      "title": "weakest link",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "ownerId": 5,
      "ownerRole": "fellow",
      "type": "note",
      "accessLevel": "role",
      "createdAt": "2017-03-07T14:17:47.064Z",
      "updatedAt": "2017-03-07T14:17:47.064Z",
      "User": {
        "firstName": "Murphy",
        "lastName": "Enaho",
        "username": "murphy",
        "role": "fellow"
      }
    }
  ]
}
```

#### Get document
> - Endpoint: **GET** `/documents/:id`
> - Authorization: Requires authorization
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "document(s) successfully retrieved.",
  "data": {
      "id": 9,
      "title": "project management",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "ownerId": 5,
      "ownerRole": "fellow",
      "type": "agenda",
      "accessLevel": "public",
      "createdAt": "2017-03-07T14:17:47.064Z",
      "updatedAt": "2017-03-07T14:17:47.064Z",
      "User": {
        "firstName": "Murphy",
        "lastName": "Enaho",
        "username": "murphy",
        "role": "fellow"
      }
  }
}
```

#### Update document
> - Endpoint: **PUT** `/documents/:id`
> - Authorization: Requires authorization and owner/admin access
```
Request
{
  "title": "Sleepy Hollow"
  "content": "From Walt Disney Pictures and visionary director Tim Burton comes an epic fantasy adventure, a magical and imaginative twist on some of the most beloved stories of all time",
  "accessLevel": "private",
  "type": "note"
}
```
```
Response
Status: 201 created

{
  "success": true,
  "msg": "document(s) successfully created.",
  "data": {
    "id": 18,
    "title": "Sleepy Hollow",
    "content": "From Walt Disney Pictures and visionary director Tim Burton comes an epic fantasy adventure, a magical and imaginative twist on some of the most beloved stories of all time",
    "type": "note",
    "accessLevel": "public",
    "ownerId": 5,
    "ownerRole": "fellow",
    "updatedAt": "2017-03-08T02:19:53.607Z",
    "createdAt": "2017-03-08T02:19:53.607Z"
  }
}
```

#### Delete document
> - Endpoint: **DELETE** `/documents/:id`
> - Authorization: Requires authorization and owner/admin access
```
Response
Status: 200 ok

{
  "success": true,
  "msg": "role(s) successfully deleted."
}
```

## Search
Streamline your search with special paramters

> - Endpoint: **GET** `/documents/search`
> - Authorization: Requires authorization
- Optional parameters
  - `?q` - queryString `ex. /documents/search?q=aLiCe`
  - `type` - document type `ex. &type=memo` 
  - `page` - current page option `ex. &page=1` default value `1`
  - `limit` - results per set `ex. &limit=5` defualt value `10`
  - `sortby` - sort option `ex. &sortby=createdAt` default value `createdAt`
  - `order` - result order `ex. &order=ASC | &order=DESC` default value `ASC`
```
Request
`hostUrl/documents/search?q=alice&type=memo&page=1&limit=10&order=DESC`
```
```
Response
Status: 200 ok

{
  "id": 18,
  "title": "Alice in wonderland",
  "content": "From Walt Disney Pictures and visionary director Tim Burton comes an epic fantasy adventure, a magical and imaginative twist on some of the most beloved stories of all time",
  "ownerId": 5,
  "ownerRole": "fellow",
  "type": "note",
  "accessLevel": "public",
  "createdAt": "2017-03-08T02:19:53.607Z",
  "updatedAt": "2017-03-08T02:19:53.607Z",
  "User": {
    "firstName": "Murphy",
    "lastName": "Enaho",
    "username": "murphy",
    "role": "fellow"
  }
}
```