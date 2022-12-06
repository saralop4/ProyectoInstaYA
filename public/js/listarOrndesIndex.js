console.log("==Sucess==")

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "";

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var value = JSON.parse( localStorage.getItem('user') );

 console.log(value.userId)

let url = `https://insta-ya.onrender.com/listarOrdenes/`+value.userId

console.log(url)

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result =>{
    let data =  JSON.parse(result);


    i = 1
    data.data.forEach(element => {
      console.log(element)

      if(element.estado == 'Cumplido'){
        document.getElementById("lista").innerHTML += ` 
      
        <tr>
        <th scope="row"> ${ i }</th>
        <th scope="row"> ${  element._id }</th>
        <td>${element.fecha}</td>
        <td>${element.ciudadEntre}</td>
        <td>${element.direcEntre}</td>
        <td>${element.estado}</td>
     
  
      </tr>
      
      `
      i++
      }

    }); 
  })
  .catch(error => console.log('error', error));




  function deleteOrder(id){


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://insta-ya.onrender.com/eliminarOrden/"+id, requestOptions)
      .then(response => response.text())
      .then(async result => {

        Swal.fire({
          title: 'Orden eliminada con exito',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showConfirmButton: false,
        })

        await setTimeout(function(){
          location.href = './listar_ordenes.html'
        }, 1000);


      })
      .catch(error => console.log('error', error));

  }