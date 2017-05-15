var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var firebase = require('firebase');
var mysql = require('mysql');

/*

												START SERVER

*/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

});
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/*

												MYSQL CONNECTION

*/
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tobuy'
});

connection.connect(function(err){
	if(!err){
		console.log("Connected");
	}else{
		console.log("Connection error");
	}
});

app.get('/query',  function(req, res){
	connection.query("SELECT * FROM users", function(err, rows, fields){
		//connection.end();
		console.log(rows);
	res.send(JSON.stringify(rows));
	});
	
})

app.post('/insert', urlencodedParser, function(req, res){
	var email = req.body.first_name;
	var password = req.body.last_name;
	connection.query("INSERT INTO users (email, password) VALUES ('email@email', '1234')");
});
/*

											MONGO DB CONNECT

*/
/*
const MongoClient = require('mongodb').MongoClient
var db;
MongoClient.connect('mongodb://administrator:password1@ds133231.mlab.com:33231/test-my-app-1', (err, database) => {
   if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});
*/
/*

											REQUESTS FROM UI

*/
app.post('/process_post',urlencodedParser, (req, res) => {
response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
	db.collection('users').save(response, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    //res.redirect('/')
  });
});
var count;
app.get('/count', function(req, res) {
	
	db.collection('users').find().toArray(function(err, results) {
		//count = results.length;
		//res.write(JSON.stringify(count));
		//console.log(JSON.stringify(count));
		res.send(results);
		//res.status(404).send("Not found");
	});
});

/*

										AUTH API CONNECTION

*/

var config = {
    apiKey: "AIzaSyAY1t4H9D3PUeu4j6_odxV1xQ5MAhS_S9Q",
    authDomain: "tobuy-68833.firebaseapp.com",
    databaseURL: "https://tobuy-68833.firebaseio.com",
    projectId: "tobuy-68833",
    storageBucket: "tobuy-68833.appspot.com",
    messagingSenderId: "1092640222732"
  };
 firebase.initializeApp(config);

 var authed = true;
app.post('/login',urlencodedParser, function(req, res) {
	
 var email = req.body.first_name;
 var pass = req.body.last_name;
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => res.send(e.message));
	
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		//console.log(firebaseUser);
		authed = true;
		res.send(JSON.stringify("true"));
	}else{
		console.log("not logged in");
		authed = false;
		res.send(JSON.stringify("false"));
	}
});
});

app.get('/authed', function(req, res){
		res.send(authed);
});

app.get('/getGroups', function(req, res){
		connection.query("SELECT * FROM groups", function(err, rows, fields){
		//connection.end();
		//console.log(rows);
	res.send(rows);
	});
});