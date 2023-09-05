import mongoose from 'mongoose'
const PromptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, "Prompt is Required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is Required"]
    },
    // date: { type: Date}

})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema)
export default Prompt;