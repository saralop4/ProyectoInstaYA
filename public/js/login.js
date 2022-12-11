function login (){
    usuario = document.getElementById("usuario").value
    contrasena = document.getElementById("contrasena").value


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usuario": usuario,
        "contrasena": contrasena
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://insta-ya.onrender.com/login", requestOptions)

    .then( async result => {

      try {
        
        data = await result.json()

        console.log(data)
        
        localStorage.setItem('user', JSON.stringify({nombre: data.data.nombre, userId:data.data.userId  }));
        var value = JSON.parse( localStorage.getItem('user') );


 
        console.log(value)     

        if(data.status){
            console.log("Okkkk")
           location.href = "./index.html"
        }else{
            Swal.fire({
                title: 'Alerta',
                text: "Usuario y/o contraseña incorrectos.",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })
        }
      } catch (error) {
        Swal.fire({
            title: 'Alerta',
            text: "Usuario y/o contraseña incorrectos.",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
      }
    })
    .catch(error => console.log('error', error));




}