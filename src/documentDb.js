import { documentsCollection } from "./dbConnect.js";

function getDocument() {
    const documents = documentsCollection.find().toArray();
    return documents;
};

function add_document_db(nome) {
    const result = documentsCollection.insertOne({
        nome,
        text: ""
    });

    return result;
};

function find_Doc(nome) {
    const document = documentsCollection.findOne({
        nome
    });

    return document;
};

function updateDoc(nome, text) {
    const update = documentsCollection.updateOne({
        nome
    }, {
        $set: {
            text
        }
    });

    return update;
};

function deleteDoc(nome) {
    const result = documentsCollection.deleteOne({
       nome 
    });

    return result;
};

export { find_Doc, updateDoc, getDocument, add_document_db, deleteDoc };