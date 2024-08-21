import mongoose, { Schema } from "mongoose";

const securityQsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    userRef: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

const SecurityQs = mongoose.model("SecurityQs", securityQsSchema);

export default SecurityQs;
