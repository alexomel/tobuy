var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var firebase = require('firebase');
var mysql = require('mysql');



/*

												FIREBASE INIT

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
	
});
app.post('/insert', urlencodedParser, function(req, res){
	var email = req.body.txt_email;
	var password = req.body.txt_password;
	connection.query("INSERT INTO users (email, password) VALUES (" + JSON.stringify(email) + "," + JSON.stringify(password) + ")");
	res.send("true");
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
 
var authenticated;
var email;

app.post('/login',urlencodedParser, function(req, res) {
	
	var email = req.body.txt_email;
	var pass = req.body.txt_password;
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => res.send(e.false));
	//console.log(auth.signInWithEmailAndPassword(email, pass));
	console.log(firebase.auth());
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log("Logged");
			authenticated = true;
			res.send(authenticated);
		}else{
			console.log("Denied");
			authenticated = false;
			res.send(authenticated);
		}
	});
});

var groups = [];
var id;
app.post('/list', urlencodedParser, function(req, res) {
	var email = req.body.txt_email;
	var values;
	
	connection.query("SELECT id FROM users WHERE email='" + email + "'", function(err, rows, fields){
		values = JSON.parse(JSON.stringify(rows));
		id = Number(values[0].id);
		//console.log(JSON.parse(id));
		var query = mysql.format('SELECT group_name FROM GROUPS WHERE id_user=?', id);
		connection.query(query, function(err, rows, fields){
		//console.log(rows);
			values = JSON.parse(JSON.stringify(rows));
			console.log("values: " + JSON.stringify(rows));
			for(var i=0; i < values.length; i++){
				groups.push(values[i].group_name);
			}
			//groups = values[0].group_name;
			//console.log(groups);
			res.send(groups);
			groups = [];
		});
	});
});