import { add_document_db, deleteDoc, find_Doc, getDocument, updateDoc } from "./documentDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    socket.on("get_docs", async (getDocs) => {
        const documents = await getDocument();
        getDocs(documents);
    });

    socket.on("add_document", async (nome) => {
        const docExist = (await find_Doc(nome)) !== null;

        if (docExist){
            socket.emit("docs_exist", nome);
        } else {
            const result = await add_document_db(nome);
        
            if(result.acknowledged) {
                io.emit("add_doc_interface", nome);
            };
        };
    });

    socket.on("select_doc", async (docName) => {
        socket.join(docName);

        const document = await find_Doc(docName);

        if (document) {
            socket.emit("text_doc", document.text);
          } else {
            socket.emit("text_doc", "");
          }
    });

    socket.on("text_edit", async ({text, docName}) => {
        const update = await updateDoc(docName, text);

        if (update.modifiedCount) {
            socket.to(docName).emit("text_edit_client", text);
        };
    });

    socket.on("delete_document", async (nome) => {
        const result = await deleteDoc(nome);

        if (result.deletedCount) {
            io.emit("delete_document_success", nome)
        }
    });
});

