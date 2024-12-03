// models/recurso.js
import mongoose from "mongoose";

const recursoSchema = mongoose.Schema({
    nombre_recurso: {
        type: String,
        required: true,
        maxlength: 100
    },
    cantidad: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true,
        maxlength: 255
    }
});

export default mongoose.model("Recurso", recursoSchema);
