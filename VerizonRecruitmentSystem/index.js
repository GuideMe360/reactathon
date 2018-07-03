/*var http = require('http');
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World...\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
fetchData();
function testServer(){
	mongoose.connect(dbConfig.url)
	.then(() => {
	    console.log("Successfully connected to the database");    
	}).catch(err => {
	    console.log('Could not connect to the database. Exiting now...');
	    process.exit();
	});
}

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
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";

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