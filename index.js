const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ROOT:LODfQLo6oHJAzhR3@cluster0.414dubm.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var collection = null;
client.connect(err => {

  collection = client.db("paquetesdb").collection("usuarios");

})

function crearUsuario (user){
  collection.insertOne(user);
}



const express = require('express')

const app = express()
app.use(express.json());


const port = process.env.PORT || 3000

app.post('/crearUsuario', (req, res) => {

  try {

    let usuario = req.body.usuario
    let contrasena = req.body.contrasena
    let nombre = req.body.nombre
    let correo = req.body.correo

    invalidos = []

    if(!usuario){
      invalidos.push('usuario')
    }

    if(!contrasena){
      invalidos.push('contrasena')
    }

    if(!nombre){
      invalidos.push('nombre')
    }
    
    if(!correo){
      invalidos.push('correo')
    }

    if(invalidos.length == 0){
     crearUsuario({
      usuario,contrasena,nombre,correo
     })
      res.send({status:true,mesaje:"Todo Ok"})
    }else{

      console.log(invalidos)
      mensaje = "Por favor enviar:"
      invalidos.forEach(element => {
        mensaje += element+', '
      });
      res.send({status:false,mesaje: mensaje})

    }

    
  } catch (error) {
    res.send({status:false,mesaje:error})
  }
 
})

app.get('/editarUsuario', (req, res) => {
  res.send('Editar')
})

app.get('/eliminarUsuario', (req, res) => {
  res.send('Eliminar')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
