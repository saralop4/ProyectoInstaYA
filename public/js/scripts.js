console.log("==Sucess==")

var raw = "";

var requestOptions = {
  method: 'GET',
  body: raw,
  redirect: 'follow'
};

fetch("localhost:5000/listarOrdens", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
  })
  .catch(error => console.log('error', error));