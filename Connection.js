const { MongoClient, ServerApiVersion } = require('mongodb');

export default class Connection {

    constructor(collection) { 
        
        const uri = "mongodb+srv://ROOT:LODfQLo6oHJAzhR3@cluster0.414dubm.mongodb.net/test";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        client.connect(err => {
            collection = client.db("paquetesdb").collection("usuarios");
        })

    }

    get getCollection() {
        return "asd"
    }

} 

