import mongoose from "mongoose";
import Validator from "validatorjs";

const productCategorySchema = new mongoose.Schema({
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

export const ProductCategory = mongoose.model(
    "ProductCategory",
    productCategorySchema
);

export const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};
