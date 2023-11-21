var express = require('express');
var router = express.Router();


fetch('http://backend.restapi.co.za/items/products')
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
