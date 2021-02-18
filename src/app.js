const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
var path = require('path');
const axios=require("axios");
const ejs=require("ejs");
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"../public")));
app.set('views', path.join(__dirname, '../views'));
app.set("view engine","ejs");
app.use(express.static("public"));
var details={},count={},hospitals={},helpline={};


app.get("/about",(req,res)=>{
  res.render("about");
});


app.get("",(req,res)=>{

  request('https://api.rootnet.in/covid19-in/stats/latest', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    const parsedbody=JSON.parse(body);
  const cities=parsedbody.data.summary.discharged;
  res.render("index",{count:cities});
});
});



app.get("/state",(req,res)=>{
res.render("searchbystate");

});

app.post("/state",(req,res)=>{
  request('https://api.rootnet.in/covid19-in/stats/latest', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
const parsedbody=JSON.parse(body);
const cities=parsedbody.data.regional;
    cities.forEach((city)=>{
      if(city.loc===req.body.cars)
      {
        details=city;
        res.render("output",{details:details});
      }
    })
  });
});


app.get("/samples",(req,res)=>{
  request('https://api.rootnet.in/covid19-in/stats/testing/latest', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    const sample=JSON.parse(body);
    res.render("samplestested",{count:sample.data});

});

});


app.get("/hospitals",(req,res)=>{
  res.render("searchhospital");
})

app.post("/hospitals",(req,res)=>{
  request('https://api.rootnet.in/covid19-in/hospitals/beds', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    const parsedbody=JSON.parse(body);
const cities=parsedbody.data.regional;

    cities.forEach((city)=>{
    //  console.log(city.state+"  "+req.body.cars)
      if(city.state===req.body.cars)
      {
        hospitals=city;
        res.render("hospitaloutput",{hospitals:hospitals});
      }
    })
  });
});


app.get("/contact",(req,res)=>{
  res.render("contact");
});

app.post("/contact",(req,res)=>{
  request('https://api.rootnet.in/covid19-in/contacts', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    const parsedbody=JSON.parse(body);
const cities=parsedbody.data.contacts.regional;
    cities.forEach((city)=>{
      if(city.loc===req.body.cars)
      {
        helpline=city;
        res.render("contactoutput",{helpline:helpline});
      }
    })
  });
});
app.get("*",(req,res)=>{
  res.render("404");
})
app.listen(3000,()=>{
  console.log("server started");
});




// var func=(url,callback)=>
// {
//   request(url, function (error, response, body) {
//     callback(body);
//   });
// }

// func('https://api.rootnet.in/covid19-in/contacts',(body)=>
// {
//   console.log(body);
// });
