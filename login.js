const express = require('express');
const r  = express.Router();




const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });

  r.post('/',(req,res)=>{
    let response = {name:'',credentials:'wrong'};
    db.select().from('Users').then( data=>{
      let u = req.body.name;
      let p = req.body.password;

      db('users').where({
        name:u,
        password:p
      }).then( data=>{
        console.log('length is',data.length);
           
        if(data.length!==0)
        {
          response.credentials='correct';
          response.name = u;
          console.log('matched');
          res.json(response);
        }
        else{ 
          res.json(response);
        }
  
      }).catch( err => {
        console.log(err);
        response.credentials=err;
        res.json(response);
      });

      
      // console.log('name is',u,'password is',p);
      // console.log('db is ',data[0]);
     
    })
  });

//  r.post('/signup',function(req,res){
//    let messages={name:'',credentials="false"};
//    let id=req.data.name;
//    let pswd=req.data.password;
//    db.select().from('message').where({name:'',password:''});
//  })
  


  r.post('/signup',(req,res)=>{
    let signup_response = {name:'',status:'unregistered'};
    let u =req.body.name;
    let p = req.body.password;
    let flag = false;
    console.log('body is ',req.body);
    // db.select().from('Users').then( data=>{
    //   let u2 = req.body.name;
    //   let p2 = req.body.password;
    //   console.log('data is',data);

      db('users').where({
        name:u,
       // password:p
      }).then( data=>{
        console.log('length is',data.length);
           
        if(data.length!==0)
        {
        //  response.credentials='correct';
          response.name = u;
          signup_response.status='already';
          console.log('matched');
          res.json(response);
        }





      // for(let i=0;i<data.length;i++)
      // {
      //   if(u2===data[i].name)
      //   {
      //     signup_response.status='already';
      //     console.log('matched');
      //   }
      // }
      if(signup_response.status==='unregistered'){
        console.log('unregistered');


        db.insert(req.body).into('users')
        .then(data=>{
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
 