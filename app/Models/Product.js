import mongoose from "mongoose";
import Validator from "validatorjs";

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        length: 24,
        required: true,
    },
    name: { type: String, minlength: 4, required: true },
    description: { type: String, minlength: 10, required: true },
    price: { type: Number, required: true },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductCategory",
            required: true,
        },
    ],
    good_for: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ConsumerCategory",
            required: true,
        },
    ],
    bad_for: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ConsumerCategory",
            required: true,
        },
    ],
    colors: [{ type: String, required: true }],
    about_the_product: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    details: [
        {
            detail: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductDetail",
                required: true,
            },
            value: { type: String, required: true },
        },
    ],
    images: [{ type: String, required: true }],
});

export const Product = mongoose.model("Product", productSchema);

export const validate = (data) => {
    const rules = {
        name: "required|string|min:4",
        description: "required|string|min:10",
        brand: "required|string|min:24|max:24",
        categories: "required|array",
        "categories.*": "required|string|min:24|max:24",
        good_for: "required|array",
        "good_for.*": "required|string|min:24|max:24",
        bad_for: "required|array",
        "bad_for.*": "required|string|min:24|max:24",
        colors: "required|array|min:3",
        about_the_product: "required|array|min:3",
        features: "required|array|min:3",
        details: "required|array",
        "details.*": {
            detail: "required|string|min:24|max:24",
            value: "required",
        },
        images: "required|array|min:3",
        price: "required|integer",
    };

    return new Validator(data, rules);
};
