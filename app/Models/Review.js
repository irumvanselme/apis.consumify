import mongoose from "mongoose";
import Validator from "validatorjs";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    title: {
        type: String,
        minlength: 4,
        unique: true,
        required: true,
    },
    body: {
        type: String,
        minlength: 10,
    },
});

export const Review = mongoose.model("Review", reviewSchema);

export const validate = (data) => {
    const rules = {
        title: "string|required|min:4",
        body: "string|required|min:10",
    };

    return new Validator(data, rules);
};
