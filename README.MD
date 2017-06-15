[![Build Status](https://travis-ci.org/vitorsilvalima/fullstack-challenge-backend.svg?branch=master)](https://travis-ci.org/vitorsilvalima/fullstack-challenge-backend)

# Backend for the FullStack Challenge

## API


```
GET /api/employees - returns all registered employees and their participation in percentage
POST /api/employees - register a new employee
```
## Error CODE
* 400 - missing fields in the post request
* 500 - internal server error

## Start the Server
```
npm start  -  it will listen to resquest in port 3000 by default
```

## Tests
```
npm test
```