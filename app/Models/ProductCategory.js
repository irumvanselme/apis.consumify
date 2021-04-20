import mongoose from "mongoose";
import Validator from "validatorjs";

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        required: true,
    },
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
        length: 24,
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
        parent_category: "string|min:24",
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};
