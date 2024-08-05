import { Request, Response } from "express";
import prismaClient from "../../../prisma";

const posts = async (req: Request, res: Response) => {
    const { postId } = req.body;

    var response = null;
    if (postId) {
        response = await prismaClient.post.findFirst({
            where: {
                id: postId
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                "message": "An error occurred with the server"
            })
        })
    }
    else {
        response = await prismaClient.post.findMany({
            where: {
                //@ts-ignore
                userId: req.userInfo?.id,
            }, orderBy: {
                created_at: 'desc'
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).json({
                "message": "An error occurred with the server"
            })
        })
    }

    return res.status(200).json({
        "message": "everything ok!",
        "data": response
    })
}

const editPost = async (req: Request, res: Response) => {
    const { data } = req.body;
    if (!data || !data.id) {
        return res.status(400).json({
            "message": "An error occurred, try reloading the page!",
            "code": "undefined id"
        })
    }

    await prismaClient.post.update({
        where: {
            id: data.id
        },
        data: {
            pages: data.pages,
            profile: data.profile,
            description: data.description,
        }
    }).then(result => {
        res.status(200).json({
            "message": "Ok",
            result
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            "message": "Some error occurred editing this post!"
        })
    })


}

export { posts, editPost };