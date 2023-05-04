const {query} = require('express');
const express = require('express');
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "",
    database : "garage"
});




app.subscribe(express.static("public"));
app.set('view engine' , "ejs");
app.set('views',"./views");
app.listen(8000)
app.use(express.json());

connect.connect(function(err){
    if (err) throw err;
    console.log("super cela fonctionne trop bien")
    connect.query("SELECT * from voiture;" , function(ree, result){
        if (err) throw err;
        console.log(result)


    })

})

app.get("/garage", function(request, response){
    connect.query("SELECT * from garage;" , function(err, result){
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);


})
});
app.get("/", function (request,response){
    response.render("test")
})

app.post('/garage', (request, response) => {
    const querys = "INSERT INTO garage (marques, models, kilometres) values ('"+request.body.marques+"','"+request.body.models+"','"+request.body.kilometres+"');"
    console.log(querys);
    console.query(querys, function (err,result){
        if(err) throw err;
        console.log(result);
        response.status(200).json(result)



    })
    
})

app.get("/garage/:id", function(request,response){
    connect.query("SELECT * from garage WHERE id="+request.params.id+";", function(err, result){

        if(err) throw err;
        console.log(result);
        response.status(200).json(result);


    })

}

)


app.delete('/garage/:id', (request, response) => {
    const id = parseInt(request/params/id);
    const query = "DELETE FROM GARAGE WHERE id="+id+ ";"
    connect.query(query, function(err, result){
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);

    })
})