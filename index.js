const express =require("express");
const bodyParser=require("body-parser");
const Request=require("request");

const app=express();

function getCryptoName(crypto)
{
    if(crypto=="BTC")
    {
        crypto="Bitcoin";
    }
    else if(crypto=="ETH")
    {
        crypto="Ethereum";
    }
    else if(crypto=="LTC")
    {
        crypto="Litecoins";
    }
    else
    {
        //nothing
    }
    return crypto;
}


function getFiatName(fiat)
{
    
    if(fiat=="USD")
    {
        fiat="Us dollar";
    }
    else if(fiat=="GBP")
    {
        fiat="GB pounds";
    }
    else if(fiat=="EUR")
    {
        fiat="Eu Euros";
    }
    else
    {
        //nothing
    }
    return fiat;
}

app.use(bodyParser.urlencoded({extended:true}));

app.listen(2000,function(){
    console.log("Server Running 2000");
})

app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
});

app.post("/",function(request,res){


    var crypto=request.body.crypto;
    var fiat=request.body.fiat;
    var crip=getCryptoName(crypto);
    var fi=getFiatName(fiat);

    var baseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL=baseURL+crypto+fiat;
    Request(finalURL,function(error,response,body){
        var data=JSON.parse(body);
        var price=data.changes.price.year;
        console.log(price);

        res.send( "<script type='text/javascript'>"+
        "function load(){"+
            "document.location.reload();"+
        "}"+
        "setTimeout(load, 5000);"+
    "</script>"+
            "<body bgcolor=#f5d491>"+
        "<h1 style='margin-top:20%;text-align:center;'>"+
        "The Current price of "+crip+" is "+price+" "+fi+
        "</h1>"+
       
        "</body>"
        );
    });

});