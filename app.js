const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//app.use(bodyParser,urlencoded({extended:true}));

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000.");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

  const fname=req.body.Fname;
  const lname=req.body.Lname;
  const email=req.body.email;

  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };
  const jsonData=JSON.stringify(data);
  const url=process.env.myURL;
  const options={
    method:"POST",
    auth:process.env.meUser
  }
  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){

      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


//apikey :  c59995ae99869c3ac1caab4547b6cd84-us13
//list id : 3d6524af53
