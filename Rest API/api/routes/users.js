// Importing express module
const express=require('express');

// Enabling router( Which can be used to work with end points)
const router=express.Router();


router.get('',(req,res,next)=>{
    res.status(200).json({
        massege:"Handling /GET requests to /users"
    });
});

router.post('/welcome',(req,res,next)=>{
    res.status(200).json({
        massege:"Handling /POST requests to /users"
    });
});

router.get('/:userName',(req,res,next)=>{
    const userName=req.params.userName; // store the userName
    if(userName==='SithumPathirana'){
        res.status(200).json({
            massege:"Welcome to Trackover "+userName
        });
    }else{
        res.status(200).json({
            massege:"Invalid User"
        });
    }
});
module.exports=router;
