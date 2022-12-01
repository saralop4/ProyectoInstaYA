console.log("==Sucess==")

var raw = "";

var requestOptions = {
  method: 'GET',

  redirect: 'follow'
};

fetch("https://insta-ya.onrender.com/listarOrdenes", requestOptions)
  .then(response => response.text())
  .then(result =>{
    let data =  JSON.parse(result);

    data.data.forEach(element => {
      console.log(element)

      document.getElementById("lista").innerHTML += ` 
      
      <tr>
      <th scope="row">1</th>
      <td>${element.fecha}</td>
      <td>Cartagena</td>
      <td>Almirante Colon</td>
      <td>Guardado</td>
    </tr>
    
    `
       
    }); 
  })
  .catch(error => console.log('error', error));