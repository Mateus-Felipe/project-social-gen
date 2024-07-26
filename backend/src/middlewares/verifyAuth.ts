import prismaClient from "../prisma";
import { verify } from 'jsonwebtoken'

interface obj {
    superadmin?: boolean,
    admin?: boolean,
    firstUser?: boolean
}

const verifyAuth = async (req: any, res: any, next: any, obj?: obj) => {
    /* jump auth verification with super password
    if ((obj?.firstUser) && (req.headers.super_password == process.env.SUPER_PASSWORD)) {
        req.firstUser = true;
        return next();
    } */
    // else {
    const user = {
        id: req.headers.created_by,
        jwtTK: req.headers.authorization
    }
    if (!user.jwtTK || !user.id) {
        return res.status(401).json({
            message: "Authentication failed: remaining itens in your requisition!"
        })
    }

    const [, authToken] = user.jwtTK.split("Bearer ");
    // const authToken = user.jwtTK.replace("Bearer")
    try {
        const { sub } = verify(
            authToken,
            // @ts-expect-error
            process.env.JWT_SECRET
        );
        // a console.log('sub');
        // a console.log(sub);
        if (sub !== user.id) { // Probally a hacker trying to get a token from another user?
            return res.status(401).json({
                message: "Authentication failed",
                code: 'tokenChanged'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed: Invalid credential!",
            code: 'noAuth'
        })
    }

    var userInfo = await prismaClient.user.findFirst({
        where: {
            id: user.id
        }, select: {
            id: true,
            name: true,
            created_at: true,
            idiom: true,
            region: true,
            updated_at: true,
            password: true
        }
    });

    if (!userInfo) {
        return res.status(401).json({
            message: "Authentication failed: User not found.",
            code: 'notFound'
        })
    }

    /*if (obj && obj.superadmin && !userInfo.superAdm) {
        return res.status(401).json({
            message: "Authentication failed: Restricted route",
            code: 'noPermission'
        });
    } else if (obj && obj.admin && userInfo.type != 'administrador') {
        return res.status(401).json({
            message: "Authentication failed: Restricted route",

            code: 'noPermission'
        })
    }*/

    req.userInfo = userInfo;

    return next();
    // }
}

export default verifyAuth;