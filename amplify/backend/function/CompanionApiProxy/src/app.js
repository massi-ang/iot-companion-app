/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var axios = require('axios')
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


app.get('/devices', function (req, res) {
  console.log(req.query)
  axios.get(process.env['ENDPOINT_API'] + '/endpoints', { params: req.query }).then(response => {
    console.log(response.data)
    res.json({ result: response.data })
  }).catch(error => {
    console.log(error)
    res.status(error.status).send(error.data)
  })
});

app.post('/devices', function (req, res) {
  let payload = {
    "event": {
      "endpoint": {
        "userId": req.body.userId,
        "thingName": req.body.deviceId,
        "friendlyName": req.body.name,
        "sku": req.body.sku,
        "description": "A Sample Device",
      }
    }
  }
  axios.post(process.env['ENDPOINT_API'] + '/endpoints', payload).then(response => {
    console.log(response)
    res.json({ result: response.data })
  }).catch(error => {
    console.log(error)
    res.status(error.status).send(error.data)
  })
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
