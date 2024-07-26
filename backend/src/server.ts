
import express from 'express'
import cors from 'cors'
import multer from 'multer';
import router from './routes';
import routerLogged from './routes_logged';
import path from 'path';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(router);
app.use(routerLogged);

const port = 4000;
app.listen(port, () => {
    console.log('Server is listening on port ' + port, new Date())
})