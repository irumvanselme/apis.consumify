import mongoose from "mongoose";
import { hashSync } from "bcrypt";
import Validator from "validatorjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre("save", function (next) {
    this.password = hashSync(
        this.password,
        parseInt(process.env.PASSWORD_SALT_ROUNDS)
    );
    next();
});

export const User = mongoose.model("User", userSchema);

export const validate = (data) => {
    const rules = {
        name: "required|string|min:5",
        username: "required|string|min:5",
        email: "required|string|min:5",
        password: "required|string|min:5",
    };

    return new Validator(data, rules);
};
