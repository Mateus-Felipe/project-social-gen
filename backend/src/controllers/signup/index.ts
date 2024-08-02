import { Request, Response } from "express"
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

const signup = async (req: Request, res: Response) => {
    const { name, login, password, idiom } = req.body;
    if (!name || !login || !password || !idiom) {
        return res.status(400).json({
            "message": "Error: empty fields in requisition."
        })
    }

    await prismaClient.user.findFirst({
        where: {
            login
        }
    }).then(async result => {
        if (result) {
            return res.status(400).json({
                "message": "Error: User already exist"
            })
        }
        const passwordHash = await hash(req.body.password, 8);

        const newUser = await prismaClient.user.create({
            data: {
                name, login, password: passwordHash, idiom, region: 'brazil'
            }
        })

        return res.status(200).json({
            "message": "User created with success!",
            result: newUser
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            "message": "Internal Server Error FdUser1"
        })
    })

}

export { signup }