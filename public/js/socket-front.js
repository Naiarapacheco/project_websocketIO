import { insertDoc } from "./index.js";

const socket = io();

function addDocument(nome) {
    socket.emit("add_document", nome);
};
  
socket.emit("get_docs", (documents) => {
    documents.forEach((document) => {
        insertDoc(document.nome);
    })
});

socket.on("add_doc_interface", (nome) => {
    insertDoc(nome);
});

socket.on("docs_exist", (nome) => {
    alert(`O documento ${nome} já existe!`);
});

export { addDocument };