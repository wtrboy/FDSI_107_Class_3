var express = require('express');
var server = express();

/************************************/
/************************************/
/************************************/
/************************************/



// render HTML from endpoints
var ejs = require('ejs');
server.set('views', __dirname + "/public");
server.engine('html', ejs.renderFile);
server.set('view engine', ejs);

// *** Load Server STATIC files *** //

server.use(express.static(__dirname + "/public"));


// body-parser to read payload (ajax data) directly to object

var bparser = require('body-parser');
server.use(bparser.json());

/************************************/
// *** WEB SERVER *** //
/************************************/

server.get('/', function(req, res){
    res.render("index.html");
});

server.get('/admin', function(req, res){
    res.render("admin.html");
});

server.get('/about', function(req, res){
    res.render('about.html');
});

server.get('/Contact', function(req, res){
    res.send("<h1>Contact (Page coming soon...)</h1>");
});

// *** REST API (Applicaiton Programming Interface) *** //

var data = [];
var cnt = 1;

server.post('/api/items',function(req, res){
    //code here to save the item
    var item = req.body; 

    if(!item.price){
        res.status(400); // bad request
        res.send("Price is required on the Item");
    }
    else {
        data.push(item);

        item.id = cnt;
        cnt += 1;
        item.status = 'Saved!';
        
        res.status(201); // created
        res.json(item);
    }   
});
/**********************************************/


server.get('/test/1', (req, res) => {
    // solve the problem and reply with the result
    // data
    var nums = [81,3,1,543,-2,53,-28,897123,1,2,-9487745,99];
    // problem: find the greatest number in the array
    // your code:
    var max = Math.max(...nums);

    // result
    res.send("Res:" + max);
});


server.listen(8080, function() {
    console.log("Server running at http://localhost:8080");
});