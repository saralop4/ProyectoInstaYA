function crearOrdenes(){


    fecha = document.getElementById("fecha").value
    hora = document.getElementById("hora").value
    largo1 = document.getElementById("largo1").value
    largo2 = document.getElementById("largo2").value
    alto = document.getElementById("alto").value
    peso = document.getElementById("peso").value
    direRecog = document.getElementById("direRecog").value
    ciudadRecog = document.getElementById("ciudadRecog").value
    nombreDesti = document.getElementById("nombreDesti").value
    cedulaDesti = document.getElementById("cedulaDesti").value
    direcEntre = document.getElementById("direcEntre").value
    ciudadEntre = document.getElementById("ciudadEntre").value

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({

  "fecha": fecha,
  "hora": hora,
  "largo1": largo1,
  "largo2": largo2,
  "alto": alto,
  "peso": peso,
  "direRecog": direRecog,
  "ciudadRecog": ciudadRecog,
  "nombreDesti": nombreDesti,
  "cedulaDesti": cedulaDesti,
  "direcEntre": direcEntre,
  "ciudadEntre": ciudadEntre
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://proyecto-instaya.herokuapp.com/crearOrden", requestOptions)
  .then(response => response.text())
  .then(result => {
    data = JSON.parse(result)
    if(data.status){

        Swal.fire({
            title: 'Orden Creada',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
                location.href = './listar_ordenes.html'
            }
          })


    }else{
        Swal.fire({
            title: 'Alerta',
            text: "Error al crear Orden",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
    }
  })
  .catch(error => console.log('error', error));


}