import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado a MONGOBD Atlas (WEB)");
    })
    .catch((error) => {
        console.log(`Ocurrio el siguiente error al conectarse == ${error.message}`);
    });

export default mongoose