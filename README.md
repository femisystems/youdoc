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
`url/roles - POST GET PUT DELETE`

| Verb     | Endpoint    | Action       |
| :------- | :---------- | :----------- |
| POST     | /roles      |  Create role |
| GET      | /roles      |  Get roles   |
| PUT      | /roles/:id  |  Update role |
| DELETE   | /roles/:id  |  Delete role |

### Users
`url/users - POST GET PUT DELETE`

### Types
`url/types - POST GET PUT DELETE`

### Documents
`url/documents - POST GET PUT DELETE`

### Search
`url/documents/search - GET`