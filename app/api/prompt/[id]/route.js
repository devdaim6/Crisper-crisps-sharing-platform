import { connectToDB } from '@utils/db'
import Prompt from "@models/prompt"


export const GET = async (request,{params}) => {
try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator');
    if(!prompt){
        return new Response("Crisp not Found",{status:404})
    }
    return new Response(JSON.stringify(prompt),{status:200})
} catch (error) {
    return new Response("Failed to fetch all Crisps",{status:500})

}
}

//Update Function
export const PATCH = async (request,{params}) => {
const {prompt,tag}=await request.json()

    try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id).populate('creator');

    if(!existingPrompt){
        return new Response("Crisp not Found",{status:404})
    }
    existingPrompt.prompt=prompt;
    existingPrompt.tag=tag;
    await existingPrompt.save()


    return new Response(JSON.stringify(existingPrompt),{status:200})
} catch (error) {
    return new Response("Failed to Update Crisp",{status:500})

}
}

//Delete Function
export const DELETE = async (request,{params}) => {
    
        try {
        await connectToDB()
    
        const existingPrompt = await Prompt.findById(params.id).populate('creator');
    
        if(!existingPrompt){
            return new Response("Crisp not Found",{status:404})
        }
        await Prompt.findByIdAndRemove(params.id);
    
    
        return new Response("Crisp Deleted Successfully",{status:200})
    } catch (error) {
        return new Response("Failed to Delete Crisp",{status:500})
    
    }
    }