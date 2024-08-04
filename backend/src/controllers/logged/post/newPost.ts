import axios from "axios";
import { Request, Response } from "express";
import prismaClient from "../../../prisma";

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
    }).then(async result => {
        console.log(result.data)
        var text = result.data.response;
        var newText = JSON.parse(`{${text.replace(/\n/g, '').replace(/'postdescription'/g, `"postdescription"`).replace(/'page'/g, `"page"`)
            .replace(/\['/g, `["`).replace(/', '/g, `", "`).replace(/']/g, `"]`).replace(/: '/g, `: "`).replace(/',/g, `",`)
            }}`);
        console.log(newText);

        // transform into object and set color value and color opacity
        var oldPages = newText.page;
        var newPages = [];
        oldPages.map((v: any) => {
            newPages.push({ colorValue: '#000', colorOpacity: 50, text: v });
        })

        const newPost = await prismaClient.post.create({
            data: {
                description: newText.postdescription,
                profile: profile ? profile : '',
                //@ts-ignore
                userId: req.userInfo?.id,
                pages: newText.page
            }
        })

        return res.status(200).json({
            "message": "Everything ok",
            "text": newText,
            newPost
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            "message": "An error occurred with the AI :("
        })
    })
}

export default newPost;