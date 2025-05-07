import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://naiarapacheco:1234@documents.5eez1nc.mongodb.net/?retryWrites=true&w=majority&appName=Documents");

let documentsCollection;

try {
    await client.connect();
    const db = client.db("websockets");
    documentsCollection = db.collection("document");
    console.log("Connect to the database with success!")
} catch (erro) {
    console.log(erro);
};

export { documentsCollection };