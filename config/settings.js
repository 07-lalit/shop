require('dotenv').config({silent: true})

var path = require('path')
var _ = require('lodash')
var environment = require('./environment.js').get()
var baseLine = {
    mongodb: {
            uri: 'mongodb://venky:password@127.0.0.1:27017/prod',
            options: {
            user: 'venky',
            pass: 'mypassword',
            }
          }
}


if (environment === 'test') {
    baseLine = _.assign(baseLine, require('./environments/test.js'))
  } else if (environment === 'production') {
    baseLine = _.assign(baseLine, require('./environments/production.js'))
  } else if (environment === 'nightwatch') {
    baseLine = _.assign(baseLine, require('./environments/nightwatch.js'))
  } else {
    baseLine = _.assign(baseLine, require('./environments/development.js'))
  }
  
  exports.get = function (env) {
    return baseLine
  }
  exports.set = function (identifer, value) {
    baseLine[identifer] = value
    return baseLine
  }