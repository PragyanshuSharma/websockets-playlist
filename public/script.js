//var user = document.getElementById("username").value;
//var pssd = document.getElementById("pssd").value;
var btn = document.getElementById("btn");

btn.addEventListener('click',function(){
   
    fetch('http://localhost:4000/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: document.getElementById("username").value ,
            password: document.getElementById("pssd").value 
        })
      }).then(res=>res.json())
        .then(res => console.log(res));


})