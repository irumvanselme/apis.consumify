import mongoose from "mongoose";
import Validator from "validatorjs";

const brandSchema = new mongoose.Schema({
    name: { required: true, type: String, minlength: 4 },
    description: { type: String, minlength: 10 },
    created_at: { type: Date, default: Date.now() },
});

export const Brand = mongoose.model("Brand", brandSchema);

export const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};
