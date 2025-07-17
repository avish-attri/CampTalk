import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true }
}, { _id: false });

const PostSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    author: {
        type: String,
        required: true,
    },
    answers: {
        type: [AnswerSchema],
        default: [],
    }
});

const PostModal = mongoose.model('QuestionPost', PostSchema);
export default PostModal;