const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/transact',function(req,res){
  res.sendFile(path.join(__dirname+'/public/transact.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/public/transact.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 7000);

console.log('Running at Port 3000');