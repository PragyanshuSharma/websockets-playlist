const express = require('express');
const sqlite3 = require('sqlite3');

// const socket = require('socket.io');
const r  = express.Router();
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });

  r.post('/',(req,res)=>{

    let respose = 'message unsent';

    db.insert(req.body).into('message')
    .then(data=>{
        respose = 'sent';
        res.json(respose);
    })
    .catch(err=>{
      response='error';
      res.json(response);
    })
 });

 


 r.post('/getmessages',(req,res)=>{

    let s = req.body.sender;
    let r = req.body.receiver;

    let response={status:'',result:''};
 
    const db = new sqlite3.Database('./db.sqlite', (err) => {
        if(err) {
            response.result=  err;
            res.json(response);
        }
        else {
            console.log('connected to databse');
        } 
    })
  
     
  
      db.all(`select * from message where sender = ? and receiver = ? or sender = ? and receiver = ? order by mid asc`,[s,r,r,s] ,(err, result) => {  
          if (err) {

            response.result=err;
            console.log("error");
            res.json(response);
          } else {
            response.status="retrieved";
            response.result=result;
            console.log("result");
            res.json(response);
          }
        });

 });


  module.exports = r;
 