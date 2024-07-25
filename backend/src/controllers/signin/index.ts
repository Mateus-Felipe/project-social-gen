import { Request, Response } from "express"
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const signin = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).json({
            "message": "Authentication failed. Credentials not send."
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            login: login
        }
    }).catch(err => {
        console.log(err);
    })

    if (!user) {
        return res.status(400).json({
            "message:": "Login or password incorrect."
        })
    }
    console.log(req.body.password);
    console.log(user.password);
    const passwordMatch = await compare(req.body.password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Senha incorreta." });
    }
    // @ts-expect-error
    delete user.password;
    const token = sign({
        name: user.name,
        login: user.login,
        // @ts-expect-error
    }, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(200).json({
        message: "Logged!",
        data: user,
        token
    });



}

export { signin }