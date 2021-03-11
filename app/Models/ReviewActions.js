import mongoose from "mongoose";

const reviewActionsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
    },
    actionType: {
        type: String,
        required: true,
        enum: ["HELPFUL", "NOT_HELPFUL"],
    },
});

export const ReviewAction = mongoose.model("ReviewAction", reviewActionsSchema);
