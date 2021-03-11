import mongoose from "mongoose";
import Validator from "validatorjs";

const brandSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        length: 24,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        length: 24,
    },
    title: { required: true, type: String, minlength: 4 },
    body: { type: String, minlength: 10 },
    create_at: { type: Date, default: Date.now() },
});

export const Brand = mongoose.model("Brand", brandSchema);

export const validate = (data) => {
    const rules = {
        title: "string|required|min:4",
        body: "string|min:10",
    };

    return new Validator(data, rules);
};
