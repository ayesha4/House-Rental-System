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

//code to view tenant data in a table
router.get('/viewtenants',(req,res)=>{
const fq="select * from tenant";
db.query('SELECT * FROM tenant', (error, results, fields) => 
{
    console.log('we did a query for tenants');
    if(error) 
    {
        console.log("Error: ",error);
        res.send({
            "code": 400,
            "failed": "Error occurred"
        });
    } else {
        // console.log("Results: ",results);
        /*res.send({
            "code": 200,
            "success": "Database successfully logged"
        });*/
        res.render('admin/viewtenants', {data: results});           
    }
});

    })

   

    // code to view landlord data on a table
    router.get('/viewlandlords',(req,res)=>{
        const fq="select * from owner";
        db.query('SELECT * FROM owner', (error, results, fields) => 
        {
            console.log('we did a query for landlordss');
            if(error) 
            {
                console.log("Error: ",error);
                res.send({
                    "code": 400,
                    "failed": "Error occurred"
                });
            } else {
                console.log("Results: ",results);
                /*res.send({
                    "code": 200,
                    "success": "Database successfully logged"
                });*/
                res.render('admin/viewlandlords', {data: results});           
            }
        });
           
            })

    router.get('/adminbooking',(req,res)=>{
        db.query('SELECT * FROM housebooking', (error, results, fields) => 
        {
            console.log('we did a query for house bookings');
            if(error) 
            {
                console.log("Error: ",error);
                res.send({
                    "code": 400,
                    "failed": "Error occurred"
                });
            } else {
                console.log("Results: ",results);
                /*res.send({
                    "code": 200,
                    "success": "Database successfully logged"
                });*/
                          
            }
            res.render('admin/adminbooking', {data: results}); 
        });
        
    })


module.exports = router;