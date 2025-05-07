import { addDocument } from "./socket-front.js";

const listDocs = document.getElementById("list-docs");
const form = document.getElementById("form-add-doc");
const inputDocument = document.getElementById("input-doc");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addDocument(inputDocument.value);
  inputDocument.value = "";
});

function insertDoc(nameDoc) {
  listDocs.innerHTML += `
    <a 
      href="document.html?nome=${nameDoc}" 
      class="list-group-item list-group-item-action">
      ${nameDoc}
    </a>
  `;
};

export { insertDoc };