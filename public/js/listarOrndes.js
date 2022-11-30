console.log("==Sucess==")

var raw = "";

var requestOptions = {
  method: 'GET',

  redirect: 'follow'
};

fetch("https://insta-ya.onrender.com/listarOrdenes", requestOptions)
  .then(response => response.text())
  .then(result =>{
     console.log(result)}
    array.forEach(element => {
      
    }); 
  )
  .catch(error => console.log('error', error));