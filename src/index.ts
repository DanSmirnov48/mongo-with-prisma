import postsRouter from './routes/posts';
import authorsRouter from './routes/author';
import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Healthy");
})

app.use(express.json());
app.use('/posts', postsRouter);
app.use('/authors', authorsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});