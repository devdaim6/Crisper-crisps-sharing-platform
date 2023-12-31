import { connectToDB } from '@utils/db'
import Prompt from "@models/prompt"
export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();
    const tags = tag.replaceAll(',', ' #');
    
    try {

        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag: tags,
            // date:Date.now()
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to Create Prompt :(", { status: 500 })
    }
}