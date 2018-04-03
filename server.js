
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

// Require firebase module
var firebase = require("firebase");

// configuring firebase
var config = {
    apiKey: "AIzaSyCKgcKXlpBybhtF9c-woG4rQhyYg_HyuVI",
    authDomain: "trackover-f78a8.firebaseapp.com",
    databaseURL: "https://trackover-f78a8.firebaseio.com",
    projectId: "trackover-f78a8",
    storageBucket: "trackover-f78a8.appspot.com",
    // messagingSenderId: "620252106693"
  };
  firebase.initializeApp(config);


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

 // 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Set the template engine
app.set('view engine', 'handlebars');



// Home page of the application
app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/register', (req, res) => {
//     res.render('index');
// });

 // Get the user information from the registration form
// app.post('/register',urlencodedParser, (req, res) => {
    
//    const user=new User({
//        _id:new mongoose.Types.ObjectId(),
//        firstName:req.body.fName,
//        lastName:req.body.lName,
//        email:req.body.email,
//        password:req.body.password,
//        mobileNumber:req.body.mobileNumber
//    });
   
   
//     // Save the user
//    user.save()
//    .then(result=>{
//        console.log(result);
//    })
//    .catch(err=>console.log(err));
  
//    // Redirecting to the index page 
//    res.redirect('/');
  
// });


app.post('/register',urlencodedParser,(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
     
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
      

      
        

        // ...
      });
      res.redirect('/');
     

});

app.post('/login',urlencodedParser,(req,res)=>{
    var email=req.body.uname;
    var password=req.body.psw;
    
  var state=1;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       if(errorCode=="auth/invalid-email"){
           console.log("Invalid Email");
           state=0
       }else  if(errorCode=="auth/wrong-password"){
        console.log("Wrong Password");
        state=0;
 }else{
    
 }
       
      
        // ...
      });

     console.log(state);
       

    
});



// Authenticating the users
// app.post('/login',urlencodedParser,(req,res)=>{
//      var email=req.body.uname;
//      var password=req.body.psw;

//      User.findOne({email:email,password:password},function(err,user){

//         if(err){
//             console.log(err);
//            return  res.status(500).send();
//         }

//         if(!user){
//             return res.status(404).send();

//         }
        
//         // Storing the users' information in an array
//         var resultArray=[];
//         mongo.connect(url,function(err,client){
//             if(err) throw err;
            
//             // Connect to the 'trackover' database
//             var db=client.db('trackover');
//             assert.equal(null,err);

//             // Select from the 'locations' collection
//             var cursor=db.collection('locations').find();
//             cursor.forEach(function(doc,err){
//                 resultArray.push(doc);
//             },function(){
//                 client.close();
//                 res.redirect('track');
//                 console.log(resultArray);

//             });
//         });

//        // return res.render('track');
         
//      })
     
     
// });

// Direct the user to the track page
app.get('/track', (req, res) => {
    res.render('track');
});


// Direct the user to the registar page
app.get('/siginin', (req, res) => {
    res.render('register');
    // res.send("OK");
});

app.get('/welcome',(req,res)=>{
 res.render('register');
});

app.get('/aboutUs',(req,res)=>{
    res.render('aboutUs');
   });

// Send a 404 error to irrelevent url requests
app.get('*', (req, res) => {
    res.status(404).send("PAGE NOT FOUND")
});

// Setting up the port to the server
app.listen(9000, () => {
    console.log('Server is up on 9000')
});

