import mongoose from "mongoose";
import Validator from "validatorjs";

const rateSchema = new mongoose.Schema({
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
    rate_count: Number,
});

export const Rate = mongoose.model("Rate", rateSchema);

export const validate = (data) => {
    const rules = {
        rate_count: "integer|required|between:0,10",
    };

    return new Validator(data, rules);
};
