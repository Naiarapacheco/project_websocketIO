const socket = io();
const params = new URLSearchParams(window.location.search);
const docName = params.get("nome");
const textEdit = document.getElementById("text_edit");
const titleDoc = document.getElementById("title_doc");
const btnDelete = document.getElementById("delete_document");

titleDoc.textContent = docName || "Documento sem título";

function selectDoc(nome) {
  socket.emit("select_doc", nome);
};

textEdit.addEventListener("keyup", () => {
  socket.emit("text_edit", {
    text: textEdit.value, 
    docName: docName,
  });
});

socket.on("text_doc", (text) => {
  textEdit.value = text;
});

socket.on("text_edit_client", (text) => {
  textEdit.value = text;
});

function emitDeleteDoc(nome) {
  socket.emit("delete_document", nome);
};

btnDelete.addEventListener("click", () => {
  emitDeleteDoc(docName);
});

function alertRedirect(nome) {
  if (nome === nome){
    alert(`Document ${nome} excluído!`);
    window.location.href = "/";
  }
};

socket.on("delete_document_success", (nome) => {
  alertRedirect(nome);
});

selectDoc(docName);
