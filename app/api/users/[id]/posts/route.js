import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
    await connectToDB();
    const allPrompts = await Prompt.find({creator: params.id}).populate("creator");
    
    return new Response(JSON.stringify(allPrompts), {status: 200});
  } catch (error) {
    return new Response("Failed to load posts", { status: 500 });
  }
};
