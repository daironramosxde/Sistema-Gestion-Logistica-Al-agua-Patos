import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error("Defina la variable de entorno");
    process.exit(1); 
}

const port = process.env.PORT || 9000;

const conexionBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Se ha conectado a MONGODB exitosamente');
    } catch (error) {
        console.error(`Hay un error al conectarse: ${error.message}`);
        process.exit(1);
    }
};

conexionBD();


export { port };