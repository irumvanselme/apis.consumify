import mongoose from "mongoose";
import Validator from "validatorjs";

const productDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        required: true,
    },
    description: {
        type: String,
        minlength: 10,
    },
});

export const ProductDetail = mongoose.model(
    "ProductDetail",
    productDetailSchema
);

export const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};
