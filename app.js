var express = require('express')
var ejs = require('ejs')
var http = require('http')
var app = express()
var mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost:27017/airline_db",function(error){
//   if(error)
//     console.error(error)
// });
mongoose.connect("mongodb://admin:root@ds027483.mongolab.com:27483/airline",function(error){
  if(error)
    console.error(error)
});
var flightSchema = mongoose.Schema({
})
var flights = mongoose.model('flight_details',flightSchema)
app.set('view engine','html')
app.engine('html',ejs.renderFile)
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/img',   express.static(__dirname + '/public/img'));
app.set('views',__dirname+'/public')

function connectionCallback(error,db)
{
  if(error)
    return console.error(error)
  var collection = db.collection('flight_details')
  return collection
}
flights.find({},function (error,data)
{
  console.log(data[0]['Source'])
})
app.get('/', function (req, res) {
  res.render('hello')
});
app.get('/schedule',function(req,res) {
  flights.find({},function (error,data)
  {
    res.json(data)
  })
})
app.get('/places',function(req,res){
  flights.find({},'source',function (error,data)
  {
    res.json(data)
  })
})
app.get('/home',function(req,res) {
  res.render('pickflight')
})
app.get('/test',function(req,res) {
    res.render('test')
})
app.get('/lalalatest', function (req, res) {
    res.render('lalalatest')
});
app.get('/TemplateTest', function (req, res) {
    res.render('TemplateTest')
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
