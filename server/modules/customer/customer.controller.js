


var MongoClient = require("mongodb").MongoClient;
var { ObjectId } = require("mongodb"); // or ObjectID
var settings = require("../../../config/settings.js").get();

async function newFunction(req,res){
    var url = settings.mongodb.uri; // please check the uri in settings, can be changed accordingly
    var new_variable= await fetchWillDataForUser(url,req,res); // await function waits for the response/ return before proceeding further
}

// url-> containes the url to connect with the mongodb
// req-> contains the data sended form the frontend
function fetchWillDataForUser(url, req, res) { 
    return new Promise(resolve => { // promise fuct endures that it will try to solve the promise made
      try {
        MongoClient.connect(url, function (err, db) {
          if (err)
            throw err;
          var dbo = db.db("prod"); // db connects with the database only but ('prod') - shows with which collection/table you want to connect
          var oid = require('mongodb').ObjectID; // it is the data type in which data is stored in the backend 
          var myid = new oid.ObjectId(req.query.id); //chk  it convert the id sended from the frontend to db understandable data tyoe
          console.log("generateWill: req.query.id", req.query.id);
          dbo.collection("users").findOne({ "_id": myid }, { willFormDetails: 1 }) // it contains the query which you want to run on the database -> this is for finding user with that id
            .then(result => { // here result contains all info of that particular id stored in the database
              let willDetails = result.willFormDetails; // accessing particular info or filtering details
              console.log("Result from WillFormDetails", willDetails);
              if (willDetails === undefined || willDetails == null
                || willDetails == "")
                resolve(""); // resolve fuction shows that the promise made in the 1st line of funct is solved
              resolve(willDetails);
            });
        });
      }
      catch (e) { console.log(e); }
    });
  }