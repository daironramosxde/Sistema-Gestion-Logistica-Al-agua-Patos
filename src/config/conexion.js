// Conexión a MongoDB

// import dotenv from "dotenv";
import mongoose from "mongoose";


const port = process.env.PORT || 9000;

const conectarBD=()=>{
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Conectado a MongoDB");
        })
        .catch((error) => {
            console.error(`Ocurrió el siguiente error al conectarse: ${error.message}`);
        });
}

export default conectarBD;  