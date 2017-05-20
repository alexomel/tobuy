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


/*

											REQUESTS FROM UI

*/
app.post('/insert', urlencodedParser, function(req, res){
	var email = req.body.txt_email;
	var password = req.body.txt_password;
	connection.query("INSERT INTO users (email, password) VALUES (" + JSON.stringify(email) + "," + JSON.stringify(password) + ")");
	res.send("true");
});
 
var authenticated;
var email;

app.post('/login',urlencodedParser, function(req, res) {
	
	email = req.body.txt_email;
	var pass = req.body.txt_password;
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => res.send(e.message));
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(!firebaseUser){
			console.log("Denied");
			authenticated = false;
			//res.send(authenticated);
		}
		if(firebaseUser){
			console.log("Logged");
			authenticated = true;
			res.send(authenticated);
		}
		console.log(authenticated);
		
	});
	
	var user = firebase.auth().currentUser;
	console.log(user);
});
app.post('/register', urlencodedParser, function(req, res){

	var email = req.body.txt_email;
	var password = req.body.txt_password;
	//console.log(email + " " + pass);
	const auth = firebase.auth();
	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => res.send(e.message));
	
	connection.query("INSERT INTO users (email, password) VALUES (" + JSON.stringify(email) + "," + JSON.stringify(password) + ")", function(err){
		console.log(err);
	});
	//res.send("true");
	
});

var groups = [];
var id;
app.post('/list', urlencodedParser, function(req, res) {
	
	var values;
	if(!email){
	email = "nekitko123@gmail.com";
	}
	
	connection.query("SELECT id FROM users WHERE email='" + email + "'", function(err, rows, fields){
	if(err){
		console.log(err);
		}
		
		values = JSON.parse(JSON.stringify(rows));
		id = Number(values[0].id);
		connection.query("SELECT DISTINCT group_name FROM GROUPS WHERE id_user=" + id +"", function(err, rows, fields){
			if(err){
		console.log(err);
		}
			values = JSON.parse(JSON.stringify(rows));
			console.log(err)
			for(var i=0; i < values.length; i++){
				console.log(err)
				groups.push(values[i].group_name);
			
			}
			groups.push(id);
			console.log(groups);
			res.send(groups);
			groups = [];
			//console.log(err)
		});
	});
	
});

app.post('/createGroup', urlencodedParser, function(req, res) {
	var group = req.body.group_name;
	if(group != ""){
	connection.query("SELECT group_name, id_user FROM groups WHERE group_name='" + group +"'", function(err, rows, fields){
			if(rows.length < 1){
				connection.query("INSERT INTO groups (group_name, id_user) VALUES (" + JSON.stringify(group) + "," + id + ")");
				res.send(true);
			}else{
				console.log(rows.length);
			}
			
	
	});
	}else{
	res.send("");
	}
});


app.post('/logout', urlencodedParser, function(req, res) {
	
	firebase.auth().signOut();
	res.send(true);

});

app.post('/groupDelete', urlencodedParser, function(req, res) {
	var group = req.body.group_name;
	connection.query("DELETE FROM groups WHERE group_name=" + JSON.stringify(group) + "");
	res.send(true);

});

app.post('/resetPassword', urlencodedParser, function(req, res) {
	var auth = firebase.auth();
	var emailAddress = req.body.txt_email;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
	}, function(error) {
  // An error happened.
	});
});

app.post('/addUser', urlencodedParser, function(req, res) {
	var email = req.body.useremail;
	var group = req.body.group_n;
	var id;
	var values;
	//console.log(JSON.stringify(email))
	if(email != ""){
	connection.query("SELECT id FROM users WHERE email='" + email + "'", function(err, rows, fields){
		
		values = JSON.parse(JSON.stringify(rows));
		
		id = Number(values[0].id);
		console.log(id);
		console.log(group);
		connection.query("SELECT group_name, id_user FROM groups WHERE group_name='" + group +"' AND id_user=" + id + "", function(err, rows, fields){
		console.log(group);
				if(rows.length < 1){
					connection.query("INSERT INTO groups (group_name, id_user) VALUES ('" + group + "'," + id + ")");
					//res.send(true);
				}else{
					console.log(rows.length);
				}
			
	
		});
		res.send(true);
	});
	}
	
});

app.post('/listUsers', urlencodedParser, function(req, res) {
	
	var group = req.body.group_name;
	connection.query("SELECT email FROM users WHERE id IN (SELECT id_user FROM groups WHERE group_name='"+group+"')", function(err, rows, fields){
			values = JSON.parse(JSON.stringify(rows));
			console.log(values);
			res.send(values);
			
	});

});

app.post('/delUser', urlencodedParser, function(req, res) {
	
	var email = req.body.user_del;
	var groupId = req.body.group_id;
	console.log(email + " " + groupId);
	connection.query("DELETE FROM groups WHERE group_name='"+groupId+"' AND id_user IN (SELECT id FROM users WHERE email='"+email+"')", function(err, rows, fields){
		res.send(true);
	});

});

app.post('/createList', urlencodedParser, function(req, res) {
	var listname = req.body.list_name;
	var groupname = req.body.group_name;
	console.log(id);
	connection.query("SELECT id FROM groups WHERE group_name='"+groupname+"' AND id_user="+id+"", function(err, rows, fields){
		values = JSON.parse(JSON.stringify(rows));
		//console.log(values[0].id);
		connection.query("INSERT INTO lists (list_name, id_group) VALUES ('"+listname+"', "+values[0].id+")", function(err, rows, fields){
	});
	});
	
	
	res.send(true);

});