const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://ROOT:LODfQLo6oHJAzhR3@cluster0.414dubm.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


var collection = null;
client.connect(err => {
  collection = client.db("paquetesdb").collection("usuarios");
  
  
})

const express = require('express')

const app = express()
app.use(express.json());


const port = process.env.PORT || 5000

app.post('/crearUsuario', (req, res) => {

  try {

    let id = req.body.id
    let usuario = req.body.usuario
    let contrasena = req.body.contrasena
    let nombre = req.body.nombre
    let correo = req.body.correo



    collection.insertOne({
      usuario,contrasena,nombre,correo
    });
      res.send({status:true,mesaje:"Todo Ok"})

    
  } catch (error) {

    console.log(error)
    res.send({status:false,mesaje:error})
  }
 
})

app.get('/EditarUsuario/:id', (req, res) => {

try {
  const userId = req.params.id;

  let usuario = req.body.usuario
  let contrasena = req.body.contrasena
  let nombre = req.body.nombre
  let correo = req.body.correo

   collection.updateOne(
    { _id: new ObjectID(userId) },
    { $set:  { usuario,contrasena,nombre,correo}},
    { upsert: true }
  )

  res.send({status:true,mesaje:"Todo Ok"})
} catch (error) {
  console.log(error)
  res.send({status:false,mesaje:error})
}



})

app.get('/VerUsuario/:id', (req, res) => {

 try {
  
  const userId = req.params.id;

  var data = collection.findOne(
    { _id: new ObjectID(userId) },
    (err,doc)=>{
      res.send({status:true,mesaje:"Todo Ok",data:doc})
    }
  )


 } catch (error) {
  console.log(error)
  res.send({status:false,mesaje:error})
 }

})

app.delete('/eliminarUsuario/:id', (req, res) => {

  try {
    
    const userId = req.params.id;
  
    collection.deleteOne(
      { _id: new ObjectID(userId) }
    )

    res.send({status:true,mesaje:"Todo Ok"})

  } catch (error) {
    console.log(error)
  res.send({status:false,mesaje:error})
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


