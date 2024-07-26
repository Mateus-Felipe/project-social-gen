import { NextFunction, Request, Response, Router } from "express";
import verifyAuth from "./middlewares/verifyAuth";
import newPost from "./controllers/logged/post/newPost";

const routesLogged = Router()

routesLogged.post('/api/logged/post/new', (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next), (req: Request, res: Response) => newPost(req, res))


export default routesLogged;