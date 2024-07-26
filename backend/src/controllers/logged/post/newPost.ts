import axios from "axios";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const newPost = async (req: Request, res: Response) => {
    const { theme, pages, profile, typeContent, contextPost } = req.body;
    const { userInfo } = req.headers;
    // prompt example
    //? Theme for post: ${theme}. Pages: ${pages}. Profile: ${profile}. Humor: ${typeContent}. Post Context: ${contextPost}?
    //? Theme for post: AI. Pages: 2. Profile: @dev.simpes. Humor: Helpful. Post Context: What is an AI?
    // prompt example
    if (!theme || !pages || !typeContent || !contextPost) {
        return res.status(400).json({
            "message": "Error: There are some empty fields in your requisition! Fill all the inputs and try again."
        })
    }

    // Prepare the req for the python api
    const text = `Theme for post: ${theme}; \n Pages: ${pages}; \n Profile: ${profile}; \n Humor: ${typeContent}; \n Post Context: ${contextPost}.`
    await axios.post('http://127.0.0.1:4500/process_text', {
        text
    }).then(result => {
        var text = result.data.response.output;
        var newText = `{${text.replaceAll('\n', '').replaceAll(`'postdescription'`, `"postdescription"`).replace(`'page'`, `"page"`)
            .replace(`['`, `["`). replace(`', '`, `", "`).replace(`']`, `"]`).replaceAll(`: '`, `: "`).replaceAll(`',`, `",`)
        }}`;
        console.log(newText);
        console.log(JSON.parse(newText));
        return res.status(200).json({
            "message": "Everything ok",
            "text": JSON.parse(newText)
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            "message": "An error occurred with the AI :("
        })
    })
}

export default newPost;