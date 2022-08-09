const express=require('express');
const router=express.Router(); 
const {db} = require('../db/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 


router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});



router.get('/dashboard',async(req,res)=>{
    const fq = 'SELECT * FROM admin WHERE adminid = ? ';
    db.query(fq,req.user.uid,(err,admin)=>{
        if(err)throw err;
        res.render('admin/dashboard',{user:admin[0]});
    });
})


router.get('/dashboard',async(req,res)=>{
    const fq = 'SELECT COUNT(*) FROM TENANT ';
    db.query(fq,(err, results)=>{
        if(err)throw err;
        
        res.render('/dashboard', { some:results})
    });
    });


module.exports = router;