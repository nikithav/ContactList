var express=require('express');
var app=express();
var mongo = require('mongojs');
var db= mongo('contacts',['contacts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());

app.get('/contacts',function(req, res){
	console.log("got the request from the client");
	db.contacts.find(function(err,docs){
		console.log(" Contact docs");
		res.json(docs);
	});
});


app.post('/contacts',function(req,res){
	console.log(req.body);
	db.contacts.insert(req.body,function(err,doc){
		res.json(doc);
	});
});


app.delete('/contacts/:id' , function(req,res){
	var id = req.params.id;
	db.contacts.remove({_id:mongo.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});


app.put('/contacts/:id', function(req, res){
	var id = req.params.id;
	db.contacts.findAndModify({query:{_id:mongo.ObjectId(id)},
		update:{$set: {name:req.body.name, email:req.body.email , phone:req.body.phone}}, 
		new:true}, function(err,doc) {
			res.json(doc);
		});
});


app.listen(3030);
console.log("server running on port : 3030");
