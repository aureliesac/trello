var express = require('express');
var unirest = require("unirest");
var http = require('http');
var _=require("lodash");
var bodyparser = require("body-parser");
var PORT = 8000;


var app = express();
app.use(bodyparser.json());
app.set('view engine', 'html');
app.set('views', __dirname);
app.get('/socialids', function(request, response) {
  getAuth (function(data){
      console.log(data);
      var authtoken = data.token_type+" "+data.access_token;
      getSocialIds (authtoken,function(ids){
        response.json(ids);
    });
   });
 });
 app.post('/publishmessage', function(request, response) {
   getAuth (function(data){
       var authtoken = data.token_type+" "+data.access_token;
       publishMessage (authtoken,request.body.socialid,request.body.message,function(msg){
         response.json(msg);
     });
    });
  });

http.Server(app).listen(PORT, function() {
    console.log("HTTP server listening on port %s", PORT);
});

function getSocialIds(authorization,cb){
  var req = unirest("GET", "https://apis.hootsuite.com/v1/socialProfiles");

  req.headers({
    "cache-control": "no-cache",
    "authorization": authorization,
    "content-type": "application/json;charset=utf-8"
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    cb(_.map(res.body.data,item=>_.pick(item,["id", "type","socialNetworkUsername" ])));
  });
}

function getAuth (cb){
  var req = unirest("POST", "https://apis.hootsuite.com/auth/oauth/v2/token");

  req.headers({
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded"
  });

  req.form({
    "grant_type": "password",
    "scope": "oob",
    "username": "aurelie.sacoman+1@hootsuite.com",
    "client_id": "l7xxbc79de85fd204a48b51f0c8db85efa3c",
    "client_secret": "336bade1b7fb4f949ef63ca1714c8b6e",
    "password": "Maggieselena*"
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    cb (res.body);
  });
}

function publishMessage (authorization, socialnetworkid, message, cb)
{ var req = unirest("POST", "https://apis.hootsuite.com/v1/messages");

req.headers({
  "cache-control": "no-cache",
  "authorization": authorization,
  "content-type": "application/json;charset=utf-8"
});

  req.send("{\n\t\"text\": \""+message+"\",\n\t\"socialProfileIds\":["+socialnetworkid+"],\n\t\"webhookUrls\": [\"http://requestb.in/1e3tg6z1\"],\n\t\"emailNotification\": true \n}");

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  cb(res.body);
});



}
