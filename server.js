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
		res.send(results);
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
var user = {

	email : "",
	password : "",
	id : "",
	authed : false
}
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
		user.email = req.body.first_name;
		user.password = req.body.last_name;
		user.id = connection.query("SELECT id FROM users WHERE email=" + user.email, function(err, rows, fields){);
		user.authed = true;
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
		connection.query("SELECT * FROM groups WHERE id_user=1", function(err, rows, fields){
			res.send(rows);
		});
});
app.post('/createGroup', function(req, res){
		connection.query("INSER INTO groups (group_name, id_user) VALUES ()", function(err, rows, fields){
			res.send(rows);
		});
});