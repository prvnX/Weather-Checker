const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get("/style.css",(req,res)=>{
    res.sendFile(__dirname+"/style.css");
});
app.post("/",(req,res)=>{
    const city=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=648a18fcdf188210d05685842f5a4c71&units=metric";
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            var temp=weatherData.main.temp;
            var imgurl="https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<div><h2>City:"+weatherData.name+"</h2></div>")
            res.write("<div><h4>The weather is currently "+weatherData.weather[0].description+"</h4></div>");
            res.write("<h1> The temperature is "+temp+"'C in "+ weatherData.name+".</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
        });
    });
});
app.post("/location",(req,res)=>{
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=648a18fcdf188210d05685842f5a4c71&units=metric";
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            res.send(data);
        });
    });
});

app.listen(3000,()=>{
    console.log("Server has started");
});