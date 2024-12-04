import mongoose from "mongoose";

const areaSchema = mongoose.Schema({
    nombre_area: {
        type: String,
        required: true,
        maxlength: 50
    }
});

export default mongoose.model("Area", areaSchema);
