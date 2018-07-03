/*var http = require('http');
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World...\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// createServer();
// fetchData();
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var app = express();
app.use(bodyParser.json());
// var fs = require("fs");

var server = app.listen(8081, function () {

	  var host = server.address().address
	  var port = server.address().port

	  console.log("Example app listening at http://%s:%s", host, port)

	});

app.get('/listUsers', function (req, res) {
	console.log("List of Users...");
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		dbo.collection("user").findOne(
				{},
				function(err, result) {
					if (err)
						throw err;
					console.log(result.name + " - " + result.email + " - "
							+ result.password);
					res.send(result);
					db.close();
				});
	});
});

app.get('/findUser/:id', function (req, res) {
	console.log('Find User...'+req.params.id);
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		var query = {
			name : req.params.id
		};

		dbo.collection("user").find(query).toArray(function(err, result) {
			if (err)
				throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.post('/userLogin', function (req, res) {
	console.log(req.body.email);
	//var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	//console.log(hashedPassword);
	MongoClient.connect(url, function(err, db) {
		
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		var query = {
			email : req.body.email,
			password : req.body.password
		};
		console.log(dbo.collection("user").find(query).count());
		dbo.collection("user").find(query).toArray(function(err, result) {
			console.log(result.affectedRows);
			if (err)
				throw err;
			console.log(result);
			res.send('Success');
			db.close();
		});
	});
});

app.post('/addUser', function (req, res) {
	
	//var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	//req.body.password = hashedPassword;	
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		dbo.collection("user").insertOne(req.body, function(err, res) {
			if (err)
				throw err;
			console.log("1 document inserted");			
			// db.close();
			// res.send(req.body);
		});
		res.send(req.body);
	});
	});



function createServer(){
	const express = require('express');
	const bodyParser = require('body-parser');
	const app = express();
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.get('/', (req, res) => {
	    res.json({"message": "Welcome to Rest API"});
	});
		app.listen(3000, () => {
	    console.log("Server is listening on port 3000");
	});
}


function fetchData() {
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		dbo.collection("user").findOne(
				{},
				function(err, result) {
					if (err)
						throw err;
					console.log(result.name + " - " + result.email + " - "
							+ result.password);
					db.close();
				});
	});
}

function insertUserData() {
	console.log('Add User...');
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		var myobj = {
			name : "Surya Reddy",
			email : "surya.reddy@verizon.com",
			password : "cde3#EDC"
		};
		dbo.collection("user").insertOne(myobj, function(err, res) {
			if (err)
				throw err;
			console.log("1 document inserted");
			db.close();
		});
	});
}

// findUser("Arun Ammasai");

function findUser(name) {
	console.log('Find User...');
	MongoClient.connect(url, function(err, db) {
		if (err)
			throw err;
		var dbo = db.db("reactathon");
		var query = {
			name : "Arun Ammasai"
		};

		dbo.collection("user").find(query).toArray(function(err, result) {
			if (err)
				throw err;
			console.log(result);
			db.close();
		});
	});

}