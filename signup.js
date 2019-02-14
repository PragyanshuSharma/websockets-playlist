
const express = require('express');
const r  = express.Router();




const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });
  r.post('/',(req,res)=>
  {
    let signup_response = {name:'',status:'unregistered'};
    let u =req.body.name;
    let p = req.body.password;
    let flag = false;
    console.log('body is ',req.body);
   
      db('users').where({name:u}).then( data=>
        {
        console.log('length is',data.length);
           
          if(data.length!==0)
          {
            signup_response.name = u;
            signup_response.status='already used name';
          }

      if(signup_response.status==='unregistered')
      {
        console.log('unregistered');
        db.insert(req.body).into('users')
        .then(data=>
          {
          console.log('registered ',data);
          signup_response.status='successfuly registered';

          res.json(signup_response);
         })
        .catch(err=>{
          signup_response.status='error';
          res.json(signup_response);
        })
      
      } 
     else {
        console.log('already registered');
        res.json(signup_response);
         }
    });
   });

   module.exports = r;