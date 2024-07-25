import { Request, Response, Router } from "express";
import { signin } from "./controllers/signin";
import { signup } from "./controllers/signup";

const routes = Router()

routes.post('/api/signin', (req: Request, res: Response) => signin(req, res))
routes.post('/api/signup', (req: Request, res: Response) => signup(req, res))

export default routes;