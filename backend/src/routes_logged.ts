import { NextFunction, Request, Response, Router } from "express";
import verifyAuth from "./middlewares/verifyAuth";
import newPost from "./controllers/logged/post/newPost";
import { posts, editPost } from "./controllers/logged/post/posts";

const routesLogged = Router()

routesLogged.post('/api/logged/post/new', (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next), (req: Request, res: Response) => newPost(req, res))
routesLogged.get('/api/logged/post/get', (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next), (req: Request, res: Response) => posts(req, res))
routesLogged.post('/api/logged/post/edit', (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next), (req: Request, res: Response) => editPost(req, res))


export default routesLogged;