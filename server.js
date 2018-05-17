
  // Requiring the express module
const express = require('express');

// Require express handlebars
const exphbs = require('express-handlebars');

// Require path module
const path = require('path');

// Require body parser
const bodyParser = require('body-parser');

// Middleware which store the data in the variable
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
// mongoose.connect('mongodb://localhost/trackover');
//mongoose.connect('mongodb://trackover:trackover123@trackover-shard-00-00-ceozy.mongodb.net:27017,trackover-shard-00-01-ceozy.mongodb.net:27017,trackover-shard-00-02-ceozy.mongodb.net:27017/test?ssl=true&replicaSet=Trackover-shard-0&authSource=admin');

// Importing user module
const User=require('./user');

app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json());

 // Set the default layout as main.handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Set the template engine
app.set('view engine', 'handlebars');



// Home page of the application
app.get('/', (req, res) => {
    res.render('index');
});



 // Saving the users in a Mongo Database which can be used as an alternative 
 // for Firebase realtime database
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

// Register the user in firebase realtime database
app.post('/register',urlencodedParser,(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
     
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        });
  

    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var firstName=req.body.fName;
          var email=req.body.email;
          var lastName=req.body.lName;
          var mobileNumber=req.body.mobileNumber;
          
          firebase.database().ref('Users/'+user.uid).set({
               firstName:firstName,
               lastName:lastName,
               email:email,
               mobileNumber:mobileNumber,
               lattitude:"",
               longitude:""
          });
          
        } else {
          // No user is signed in.
        }
      });

      res.redirect('/');

     

});

// Log In a user who has already signed up
app.post('/login',urlencodedParser,(req,res)=>{
    var email=req.body.uname;
    var password=req.body.psw;
    console.log(email);
    console.log(password);
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        res.redirect('/track'); 
    })
    .catch(function(error) {

        res.redirect('/');
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // //console.log(errorCode);
        // if(errorCode=="auth/wrong-password"){
        //   res.redirect('/');
        // }else{
        //     res.redirect('/track'); 
        // }
        // var userId = firebase.auth().currentUser.uid;
        // console.log(userId);
     });

       
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // var lattitude = firebase.database().ref(user.uid+'/lattitude');
    //         //  lattitude.on('value',function(snapshot){
    //         //      console.log(snapshot.val());
    //         //  });
             
    //         //  var longitude = firebase.database().ref(user.uid+'/longitude');
    //         //  longitude.on('value',function(snapshot){
    //         //      console.log(snapshot.val());
    //         //  });
           
    //     } else {
    //       // No user is signed in.
    //     }
        
    //   });
     

   
     


    
});



// Authenticating the users in the MongoDB
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

//         return res.render('track');
         
//      })
     
     
// });


// Direct the user to the track page
app.get('/track', (req, res) => {

  
     // Get the lattitude and the longitude location of a user who has currently signed in.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var a1;
            var a2;
        
           console.log(user.uid);
           
           var lat = firebase.database().ref('Users/'+user.uid+'/lattitude');
           lat.on('value',function(snapshot){
                 a1=snapshot.val();
                 console.log(a1);
           });
           
           var lon = firebase.database().ref('Users/'+user.uid+'/longitude');
           lon.on('value',function(snapshot){
              a2=snapshot.val();
              console.log(a2);

              res.render('track',{
                lattitude:a1,
                longitude:a2
            });
           });

         

        } else {
          // No user is signed in.
        }
      });
        
     
    
    
});


// Direct the user to the registar page
app.get('/signup', (req, res) => {
    res.render('register');
    // res.send("OK");
});


// Direct the user to the "About Us" page
app.get('/aboutUs',(req,res)=>{
    res.render('aboutUs');
   });

// Sign out a user
app.get('/signout',(req,res)=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        res.redirect('/');
      }).catch(function(error) {
        // An error happened.
      });
     
});

// Send a 404 error to irrelevent url requests
app.get('*', (req, res) => {
    res.status(404).send("PAGE NOT FOUND")
});

const PORT = process.env.PORT || 9000;
// Setting up the port to the server
app.listen(PORT, () => {
    console.log('Server is up on', PORT)
});

