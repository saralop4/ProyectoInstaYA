const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://ROOT:LODfQLo6oHJAzhR3@cluster0.414dubm.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


var collection = null;
client.connect(err => {
  collection = client.db("paquetesdb").collection("usuarios");
})

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());

const allowedOrigins = ['0.0.0.0'];


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const port = process.env.PORT || 5000


//Auth

app.post('/login', (req, res) => {

  let usuario = req.body.usuario
  let contrasena = req.body.contrasena

  var data = collection.findOne(
    { usuario, contrasena},
    (err,doc)=>{
      console.log(doc)
      if(doc){
        res.send({status:true,data: doc,mesaje:"Ok"})
      }else{
        res.send({status:false,data: null,mesaje:"NO LOGIN"})
      }


    }
  )

  


 
 
})


//Usuario


app.post('/crearUsuario', (req, res) => {

  try {

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





//Ordenes 

app.post('/crearOrden', (req, res) => {


  client.connect(err => {
    OrdenesCollection = client.db("paquetesdb").collection("Ordenes");

    try {

      let fecha = req.body.fecha
      let hora = req.body.hora
      let largo1 = req.body.largo1
      let largo2 = req.body.largo2
      let alto= req.body.alto
      let peso = req.body.peso
      let direRecog = req.body.direRecog
      let ciudadRecog = req.body.ciudadRecog
      let nombreDesti = req.body.nombreDesti
      let cedulaDesti = req.body.cedulaDesti
      let direcEntre = req.body.direcEntre
      let ciudadEntre = req.body.ciudadEntre
      
      
      OrdenesCollection.insertOne({
        fecha,hora,largo1,largo2,alto,peso,direRecog,ciudadRecog,
        nombreDesti,cedulaDesti,direcEntre,ciudadEntre
      });
      
      res.send({status:true,mesaje:"Todo Ok"})
  
      
    } catch (error) {
  
      console.log(error)
      res.send({status:false,mesaje:error})
    }
  })


 
})


app.get('/listarOrdenes', async (req,res) =>  {

  OrdenesCollection = client.db("paquetesdb").collection("Ordenes");

   let ordenes =await OrdenesCollection.find().toArray()

   console.log(ordenes)
   res.send({status:true,data:ordenes,mesaje:"ok"})


})

app.put('/actualizarOrden', (req,res)  => {

  collection.updateOne(
    {usuario:"sergio" },
    {
      $set: { "nombre": "sergio antonio de las nieves " }
    }
    ) 

  res.send({status:true,mesaje:"ok"})

})
