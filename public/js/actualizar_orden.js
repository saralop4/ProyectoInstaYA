console.log("==Sucess==")

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "";

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var value = JSON.parse( localStorage.getItem('user') );

const valores = window.location.search;

const urlParams = new URLSearchParams(valores);
var idOrden = urlParams.get('id');
console.log(idOrden)


let url = `http://127.0.0.1:5000/VerOrden/`+idOrden

console.log(url)

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result =>{

    let data = JSON.parse(result);

    mapSelect = {
        "Guardado":"1",
        "Cumplido":"2",
        "Canselado":"3"
    }

    mapSelect2 = {
        "1":"Guardado",
        "2":"Cumplido",
        "3":"Canselado"
    }

    document.getElementById("fecha").value = data.data.fecha || ''
    document.getElementById("hora").value = data.data.hora || ''
    document.getElementById("largo1").value = data.data.largo1 || ''
    document.getElementById("largo2").value = data.data.largo2 || ''
    document.getElementById("alto").value = data.data.alto || ''
    document.getElementById("peso").value = data.data.peso || ''
    document.getElementById("direRecog").value = data.data.direRecog || ''
    document.getElementById("ciudadRecog").value = data.data.ciudadRecog || ''
    document.getElementById("nombreDesti").value = data.data.nombreDesti || ''
    document.getElementById("cedulaDesti").value = data.data.cedulaDesti || ''
    document.getElementById("direcEntre").value = data.data.direcEntre || ''
    document.getElementById("ciudadEntre").value = data.data.ciudadEntre || ''
    document.getElementById("estado").value = mapSelect[data.data.estado] 


  })
  .catch(error => console.log('error', error));



  function updateOrder(){

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
    estado =  document.getElementById("estado").value



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
        "ciudadEntre": ciudadEntre,
        "estado": mapSelect2[estado],
        "userId": JSON.parse( localStorage.getItem('user') ).userId
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/actualizarOrden/"+idOrden, requestOptions)
    .then(response => response.text())
    .then(result => {
        data = JSON.parse(result)
        if(data.status){
    
            Swal.fire({
                title: 'Orden Actualizada',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ver ordenes'
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