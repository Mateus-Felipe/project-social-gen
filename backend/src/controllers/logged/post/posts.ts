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
                userId: req.userInfo?.id
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

export default posts;