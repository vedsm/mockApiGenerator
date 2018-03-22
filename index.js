'use strict'

const express = require('express')
const app = express()
app.set('port', 3000);
// app.get('/', (req, res) => res.json({message:'Dummy Api Contracts of mfine!'}));

// var api = require('./api/index.js')
// app.use('/api', api)


const api_contracts = require('./api_contracts.json');

var generateAPIsUsingContract = function(api_contract){
  let {root, cruds, children} = api_contract;
  // console.log("root, cruds, children",root, cruds, children);
  if(!root || !cruds || !Array.isArray(cruds) || !children || !Array.isArray(children)){
    console.log("Error!!! Please declare your api_contract correctly! Its a nested JSON of the form {root:__,crud:[..],children:[...]");
  }

  // console.log("root, methods, children",root);
  let router = express.Router();
  
  cruds.forEach((crud) => {
    let {method, response} = crud
    switch(method) {
      case "GET":
        router.get("/", (req, res) => res.json(response))
        break;
      case "POST":
        router.post("/", (req, res) => res.json(response))
        break;
      case "PUT":
        router.put("/", (req, res) => res.json(response))
        break;
      case "DELETE":
        router.delete("/", (req, res) => res.json(response))
        break;
      case "OPTIONS":
        router.options("/", (req, res) => res.json(response))
        break;
      case "PATCH":
        router.patch("/", (req, res) => res.json({cruds, children}))
        break;
      default:
        console.log("Please provide a valid method name!",api_contract, crud)
    }
  })

  children.forEach((child) => {
    router.use(child.root, generateAPIsUsingContract(child))
  })
  return router;
}

app.use('/', generateAPIsUsingContract(api_contracts));


// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Dummy Api Contracts of mfine hosted on port ' + port);
});