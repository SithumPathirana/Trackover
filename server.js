
  // Requiring the express module
const express = require('express');

// Require express handlebars
const exphbs = require('express-handlebars');

// Require path module
const path = require('path');

// Require body parser
const bodyParser = require('body-parser');

// Middleware which store the data in the variabl
var urlencodedParser=bodyParser.urlencoded({extended:false});

// Require mongoose
const mongoose=require('mongoose');

// Require mongo module
const mongo=require('mongodb');

// Require assert
const assert=require('assert');

// Mongodb url
var url='mongodb://localhost/';


// Execute express
const app = express();

// Connect to the trackover database
mongoose.connect('mongodb://localhost/trackover');
//mongoose.connect('mongodb://trackover:trackover123@trackover-shard-00-00-ceozy.mongodb.net:27017,trackover-shard-00-01-ceozy.mongodb.net:27017,trackover-shard-00-02-ceozy.mongodb.net:27017/test?ssl=true&replicaSet=Trackover-shard-0&authSource=admin');

// Importing user module
const User=require('./user');

app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

 
app.post('/',urlencodedParser, (req, res) => {
    
   const user=new User({
       _id:new mongoose.Types.ObjectId(),
       firstName:req.body.fName,
       lastName:req.body.lName,
       email:req.body.email,
       password:req.body.password,
       mobileNumber:req.body.mobileNumber
   });
   
   

   user.save()
   .then(result=>{
       console.log(result);
   })
   .catch(err=>console.log(err));
  
   // Redirecting to the index page 
   res.render('index');
  
});

// Authenticating the users
app.post('/track',urlencodedParser,(req,res)=>{
     var email=req.body.uname;
     var password=req.body.psw;

     User.findOne({email:email,password:password},function(err,user){

        if(err){
            console.log(err);
           return  res.status(500).send();
        }

        if(!user){
            return res.status(404).send();

        }

        var resultArray=[];
        mongo.connect(url,function(err,client){
            if(err) throw err;
            
            var db=client.db('trackover');
            assert.equal(null,err);
            var cursor=db.collection('locations').find();
            cursor.forEach(function(doc,err){
                resultArray.push(doc);
            },function(){
                client.close();
                res.render('track');
                console.log(resultArray);

            });
        });

       // return res.render('track');
         
     })
     
     
});

app.get('/track', (req, res) => {
    res.render('track');
    // res.send("OK");
});



app.get('/siginin', (req, res) => {
    res.render('register');
    // res.send("OK");
});

app.get('*', (req, res) => {
    res.status(404).send("PAGE NOT FOUND")
});

app.listen(9000, () => {
    console.log('Server is up on 9000')
});

