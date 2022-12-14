function enviarFormulario(){
    

    console.log("Hola mundo")

    usuario = document.getElementById("usuario").value
    contrasena = document.getElementById("contrasena").value
    nombre = document.getElementById("nombre").value
    correo = document.getElementById("correo").value

    let mensaje = null
    
  if(!validarEmail(correo)){
    mensaje= "Email invalido"
  }

    
    if( !usuario || !contrasena || !nombre || !correo ){
            mensaje= "Todos los campos debes estar digitados"

    }   

    
    console.log(mensaje)


    if( mensaje ){

        Swal.fire({
            title: 'Alerta',
            text: mensaje,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
    
    }else{
        
        console.log("Enviado")
        send(usuario,contrasena,nombre,correo)
    }

    console.log(correo)
     
}

function send(usuario, contrasena, nombre, correo){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        usuario,contrasena,nombre,correo
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://insta-ya.onrender.com/crearUsuario", requestOptions)
      .then(async response => 
        {

                Swal.fire({
                    title: 'Usuario creado',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
                    if (result.isConfirmed) {
                     location.href = './login.html'
                    }
                  })

        }
      )

}


function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
   return true;
  } else {
   return false;
  }
}